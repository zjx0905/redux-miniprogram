import { AnyObject, MapStateToStore, MapDispatchToStore, ConnectType } from '../types';
import { useState, useDispatch } from '../api/hooks';
import diff from '../utils/diff';
import isEmptyObject from '../utils/isEmptyObject';
import verifyPlainObject from '../utils/verifyPlainObject';
import serializeCopy from '../utils/serializeCopy';
import createCommit from './createCommit';
import batchUpdate from './batchUpdate';
import proxyConnectStore from './proxyConnectStore';
import mixinInitData from './mixinInitData';
import mixinLifetimes from './mixinLifetimes';

const mapStateToStoreDefault: MapStateToStore = () => ({});

const mapDispatchToStoreDefault: MapDispatchToStore = (dispatch) => ({ dispatch });

/**
 * 连接 Redux Store
 *
 * @param type               连接类型
 * @param mapStateToStore    订阅 state
 * @param mapDispatchToStore 包装 dispatch
 */
export default function connect(
  type: ConnectType,
  mapStateToStore: MapStateToStore = mapStateToStoreDefault,
  mapDispatchToStore: MapDispatchToStore = mapDispatchToStoreDefault
) {
  return function connected(options: AnyObject): AnyObject {
    /**
     * 同步提交
     */
    const commit = createCommit();

    /**
     * 当前组件订阅的状态
     *
     * 在多个实例间共享
     */
    const { state = {}, pureState = {} } = mapStateToStore(useState());

    verifyPlainObject('mapStateToStore() state', state);

    verifyPlainObject('mapStateToStore() pureState', pureState);

    const copyState = serializeCopy(state);

    /**
     * 当前组件的 dispatch
     *
     * 在多个实例间共享
     */
    const dispatch = mapDispatchToStore(useDispatch());

    verifyPlainObject('mapDispatchToStore()', dispatch);

    /**
     * 当前组件的实例集合
     */
    const instances: AnyObject[] = [];

    /**
     * 取消订阅批量更新的函数
     */
    // eslint-disable-next-line @typescript-eslint/ban-types
    let unsubscribe: Function | undefined;

    /**
     * 更新函数
     *
     * 在多个实例间共享
     *
     * @param state Redux Store
     */
    function updater(rootState: AnyObject) {
      commit.run(() => {
        const { state: nextState, pureState: nextPureState } = mapStateToStore(rootState);

        if (nextPureState !== void 0) {
          Object.assign(pureState, nextPureState);
        }

        if (nextState === void 0) {
          return;
        }

        const updateState = diff(state, nextState);

        if (isEmptyObject(updateState)) {
          return;
        }

        Object.assign(state, nextState);

        // eslint-disable-next-line @typescript-eslint/ban-types
        instances.forEach((instance) => (instance.setData as Function)(updateState));
      });
    }

    /**
     * 实例加载时的逻辑
     *
     * @param this 当前实例
     */
    function load(this: AnyObject): void {
      proxyConnectStore(this, commit, state, pureState, copyState, dispatch);

      // 加载时添加当前实例到实例集合
      instances.push(this);

      // 加载时如果取消订阅批量更新的函数不存在
      // 说明还没有订阅批量更新
      if (unsubscribe === void 0) {
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
      if (instances.length === 0 && unsubscribe !== void 0) {
        unsubscribe();

        unsubscribe = void 0;
      }
    }

    return mixinLifetimes(type, mixinInitData(options, copyState), load, unload);
  };
}
