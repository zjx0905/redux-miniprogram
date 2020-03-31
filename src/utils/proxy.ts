/*
 * @Author: early-autumn
 * @Date: 2020-03-29 17:18:03
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-03-31 21:43:41
 */
import { Committing } from '../types';
import { useDispatch } from '../hooks';
import assert from './assert';

export default function defineProperty(
  instance: { data?: Record<string, any>; store: AnyObject },
  committing: Committing,
  currentState: AnyObject,
  currentDispatch: AnyObject
): void {
  // const GET_ERROR_MESSAGE = `获取 store 中的状态: wxml 中通过 store.xxx 获取, js 中通过 this.store.xxx 获取`;
  const SET_ERROR_MESSAGE = `修改 store 中的状态: 必须通过 dispatch 完成`;
  const dispatch = useDispatch();
  const proxy = new Proxy(
    { ...currentState, ...currentDispatch, dispatch },
    {
      get(obj: AnyObject, key: string) {
        return obj[key];
      },
      set(obj: AnyObject, key: string, value: any) {
        assert(!committing.state, SET_ERROR_MESSAGE);
        obj[key] = value;
        return true;
      },
    }
  );

  Object.defineProperty(instance, 'store', {
    get() {
      return proxy;
    },
    set() {
      assert(!committing.state, SET_ERROR_MESSAGE);
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
