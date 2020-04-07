/*
 * @Author: early-autumn
 * @Date: 2020-03-29 17:18:03
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-07 18:37:29
 */
import { AnyObject, Committing } from '../types';
import assert from '../utils/assert';

const GET_ERROR_MESSAGE = `需要通过 this.store.xxx 获取 store 中的状态`;
const SET_ERROR_MESSAGE = `需要通过 dispatch 修改 store 中的状态`;

/**
 * 将 ConnectStore 代理到当前实例的 store 属性
 *
 * 并劫持 data 中的 store 属性 防篡改
 *
 * @param instance 当前实例
 * @param committing 提交状态
 * @param currentState 订阅的状态
 * @param currentDispatch 包装过的 dispatch
 */
export default function proxyConnectStore(
  instance: AnyObject,
  committing: Committing,
  currentState: AnyObject,
  currentDispatch: AnyObject
): void {
  Object.defineProperty(instance, 'store', {
    get() {
      return { ...currentState, ...currentDispatch };
    },
    set() {
      assert(!committing.state, SET_ERROR_MESSAGE);
    },
  });

  Object.defineProperty(instance.data, 'store', {
    get() {
      assert(!committing.state, GET_ERROR_MESSAGE);

      return GET_ERROR_MESSAGE;
    },
    set() {
      assert(!committing.state, SET_ERROR_MESSAGE);
    },
    enumerable: false,
  });
}
