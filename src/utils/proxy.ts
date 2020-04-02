/*
 * @Author: early-autumn
 * @Date: 2020-03-29 17:18:03
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-03 00:24:23
 */
import { Committing } from '../types';
import { assert } from './index';

// const GET_ERROR_MESSAGE = `获取 store 中的状态: wxml 中通过 store.xxx 获取, js 中通过 this.store.xxx 获取`;
const SET_ERROR_MESSAGE = `修改 store 中的状态: 只能通过 dispatch 完成`;

export default function defineProperty(
  instance: { data: Record<string, any>; store: AnyObject },
  committing: Committing,
  store: AnyObject
): void {
  const proxy = new Proxy(store, {
    get(obj: AnyObject, key: string) {
      return obj[key];
    },
    set() {
      assert(!committing.state, SET_ERROR_MESSAGE);
      return false;
    },
  });

  function defineProperty(obj: AnyObject) {
    Object.defineProperty(obj, 'store', {
      get() {
        return proxy;
      },
      set() {
        assert(!committing.state, SET_ERROR_MESSAGE);
      },
    });
  }

  defineProperty(instance);
  defineProperty(instance.data);
}
