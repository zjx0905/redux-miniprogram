/*
 * @Author: early-autumn
 * @Date: 2020-03-29 17:18:03
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-01 20:29:00
 */
import { Committing } from '../types';
import { useDispatch } from '../hooks';
import { assert } from './index';

// const GET_ERROR_MESSAGE = `获取 store 中的状态: wxml 中通过 store.xxx 获取, js 中通过 this.store.xxx 获取`;
const SET_ERROR_MESSAGE = `修改 store 中的状态: 只能通过 dispatch 完成`;

export default function defineProperty(
  instance: { data?: Record<string, any>; store: AnyObject },
  committing: Committing,
  currentState: AnyObject,
  currentDispatch: AnyObject
): void {
  const dispatch = useDispatch();
  Object.defineProperty(instance, 'store', {
    get() {
      return { ...currentState, ...currentDispatch, dispatch };
    },
    set() {
      assert(!committing.state, SET_ERROR_MESSAGE);
    },
  });

  const proxy = new Proxy(instance.store, {
    get(obj: AnyObject, key: string) {
      return obj[key];
    },
    set() {
      assert(!committing.state, SET_ERROR_MESSAGE);
      return false;
    },
  });

  Object.defineProperty(instance.data, 'store', {
    get() {
      return proxy;
    },
    set() {
      assert(!committing.state, SET_ERROR_MESSAGE);
    },
  });
}
