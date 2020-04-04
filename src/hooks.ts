/*
 * @Author: early-autumn
 * @Date: 2020-03-30 13:37:39
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-04 19:32:44
 */
import { Store, Dispatch } from 'redux';
import assert from './utils/assert';

let store: Store;

/**
 * 获取 store 对象
 */
export function useStore(): Store {
  if (store === undefined) {
    store = getApp().store as Store;

    assert(
      store === undefined,
      '没有找到 store, 有可能 app.js 中 Provider 此时还没有执行 或者 已经执行但没有将 store 作为参数传入'
    );
  }

  return store;
}

/**
 * 获取 store 中的 state
 */
export function useState(): AnyObject {
  if (store === undefined) {
    useStore();
  }

  return store.getState();
}

/**
 * 获取 store 中的 dispatch 函数
 */
export function useDispatch(): Dispatch {
  if (store === undefined) {
    useStore();
  }

  return store.dispatch;
}
