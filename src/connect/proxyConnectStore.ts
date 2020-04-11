/*
 * @Author: early-autumn
 * @Date: 2020-03-29 17:18:03
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-11 12:59:32
 */
import { AnyObject, Commit } from '../types';
import assert from '../utils/assert';

const GET_ERROR_MESSAGE = `需要通过 this.store.xxx 获取 store 中的状态`;
const SET_ERROR_MESSAGE = `需要通过 dispatch 修改 store 中的状态`;

/**
 * 将 ConnectStore 代理到当前实例的 store 属性
 *
 * 并劫持 data 中的 store 属性 防篡改
 *
 * @param instance 当前实例
 * @param commit 提交状态
 * @param currentState 订阅的状态
 * @param currentStatic 订阅包装过的 dispatch
 */
export default function proxyConnectStore(
  instance: AnyObject,
  commit: Commit,
  currentState: AnyObject,
  currentPureData: AnyObject,
  copyState: AnyObject
): void {
  Object.defineProperty(instance, 'store', {
    get() {
      return { ...currentState, ...currentPureData };
    },
    set() {
      assert(commit.getState() === false, SET_ERROR_MESSAGE);
    },
  });

  Object.defineProperty(instance.data, 'store', {
    get() {
      assert(commit.getState() === false, GET_ERROR_MESSAGE);

      return copyState;
    },
    set() {
      assert(commit.getState() === false, SET_ERROR_MESSAGE);
    },
    enumerable: false,
  });
}
