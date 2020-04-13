/*
 * @Author: early-autumn
 * @Date: 2020-03-30 13:37:39
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-13 16:23:14
 */
import { Store, Dispatch } from 'redux';
import { AnyObject } from '../types';
import assert from '../utils/assert';

let store: Store;

/**
 * 获取 Redux Store
 *
 * @see[查看文档](https://github.com/early-autumn/redux-miniprogram#usestore)
 */
export function useStore(): Store {
  if (store === undefined) {
    store = getApp().store;

    assert(
      store === undefined,
      `没有找到 Redux Store
      可能 app.js 中 Provider 此时还没有执行 或者 已经执行但没有将 Redux Store 作为参数传入`
    );
  }

  return store;
}

/**
 * 获取 Redux Store 中的 State
 *
 * @see[查看文档](https://github.com/early-autumn/redux-miniprogram#usestate)
 */
export function useState(): AnyObject {
  if (store === undefined) {
    useStore();
  }

  return store.getState();
}

/**
 * 获取 Redux Store 中的 dispatch 函数
 *
 * @see[查看文档](https://github.com/early-autumn/redux-miniprogram#usedispatch)
 */
export function useDispatch(): Dispatch {
  if (store === undefined) {
    useStore();
  }

  return store.dispatch;
}
