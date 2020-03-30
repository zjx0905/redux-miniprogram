/*
 * @Author: early-autumn
 * @Date: 2020-03-30 13:37:39
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-03-30 19:39:06
 */
import { Store, Dispatch } from 'redux';
import assert from './utils/assert';

let store: Store;

export function useStore(): Store {
  if (store === undefined) {
    store = getApp().store as Store;

    assert(
      store === undefined,
      '没有找到 store , 请确认 app.js 是否有调用 Provider 并且传入了 store'
    );
  }

  return store;
}

export function useState(): AnyObject {
  if (store === undefined) {
    useStore();
  }

  return store.getState();
}

export function useDispatch(): Dispatch {
  if (store === undefined) {
    useStore();
  }

  return store.dispatch;
}
