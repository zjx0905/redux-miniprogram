/*
 * @Author: early-autumn
 * @Date: 2020-03-29 17:18:03
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-03-31 21:18:26
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
  // return `获取 store 中的状态: wxml 中通过 store.xxx 获取, js 中通过 this.store.xxx 获取`;
  const dispatch = useDispatch();
  const message = `修改 store 中的状态: 必须通过 dispatch 完成`;
  const proxy = new Proxy(
    { ...currentState, ...currentDispatch, dispatch },
    {
      get(obj: AnyObject, key: string) {
        return obj[key];
      },
      set(obj: AnyObject, key: string, value: any) {
        assert(!committing.state, message);
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
      assert(!committing.state, message);
    },
  });

  Object.defineProperty(instance.data, 'store', {
    get() {
      return proxy;
    },
    set() {
      assert(!committing.state, message);
    },
  });
}
