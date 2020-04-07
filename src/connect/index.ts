/*
 * @Author: early-autumn
 * @Date: 2020-04-04 12:37:19
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-07 21:44:29
 */
import { AnyObject, MapStateToStore, MapDispatchToStore, ConnectType } from '../types';
import { useState, useDispatch } from '../api/hooks';
import createCommitting from '../utils/createCommitting';
import batchUpdate from '../utils/batchUpdate';
import verifyPlainObject from '../utils/verifyPlainObject';
import diff from '../utils/diff';
import isEmptyObject from '../utils/isEmptyObject';
import proxyConnectStore from './proxyConnectStore';
import mixinInitData from './mixinInitData';
import mixinLifetimes from './mixinLifetimes';

const mapStateToStoreDefault: MapStateToStore = () => ({});

const mapDispatchToStoreDefault: MapDispatchToStore = (dispatch) => ({ dispatch });

/**
 * 连接 Redux Store
 *
 * @param type 连接类型
 * @param mapStateToStore 订阅 state 的函数
 * @param mapDispatchToStore 包装 dispatch 的函数
 */
export default function connect(
  type: ConnectType,
  mapStateToStore: MapStateToStore = mapStateToStoreDefault,
  mapDispatchToStore: MapDispatchToStore = mapDispatchToStoreDefault
) {
  return function connected(options: AnyObject): AnyObject {
    const committing = createCommitting();
    const currentState = mapStateToStore(useState());

    verifyPlainObject('mapStateToStore()', currentState);

    const currentDispatch = mapDispatchToStore(useDispatch());

    verifyPlainObject('mapDispatchToStore()', currentDispatch);

    /**
     * 当前被创建的实例集合
     */
    const instances: AnyObject[] = [];
    /**
     * 取消订阅批量更新的函数
     */
    let unsubscribe: Function | undefined;

    /**
     * 更新函数
     *
     * 组件被多次实例化会共享同一个更新函数
     *
     * @param state Redux Store
     */
    function updater(state: AnyObject) {
      committing.commit(() => {
        const nextState = mapStateToStore(state);
        const updateState = diff(currentState, nextState);

        if (isEmptyObject(updateState)) {
          return;
        }

        Object.assign(currentState, nextState);

        instances.forEach((instance) => instance.setData(updateState));

        committing.end();
      });
    }

    /**
     * 实例加载时的逻辑
     *
     * @param this 当前实例
     */
    function load(this: AnyObject): void {
      proxyConnectStore(this, committing, currentState, currentDispatch);

      // 加载时添加当前实例到实例集合
      instances.push(this);

      // 加载时如果取消订阅批量更新的函数不存在
      // 说明还没有订阅批量更新
      if (unsubscribe === undefined) {
        unsubscribe = batchUpdate.subscribe(updater);
      }
    }

    /**
     * 实例卸载时的逻辑
     *
     * @param this 当前实例
     */
    function unload(this: AnyObject): void {
      const index = instances.indexOf(this);

      // 卸载时从实例集合删除当前实例
      instances.splice(index, 1);

      // 当实例集合为空时
      // 如果存在取消订阅批量更新的函数
      // 需要取消订阅批量更新并将取消订阅批量更新的函数赋值为空
      if (instances.length === 0 && unsubscribe !== undefined) {
        unsubscribe();

        unsubscribe = undefined;
      }
    }

    return mixinLifetimes(type, mixinInitData(options, currentState), load, unload);
  };
}
