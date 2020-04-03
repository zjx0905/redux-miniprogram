/*
 * @Author: early-autumn
 * @Date: 2020-03-29 17:18:03
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-03 21:00:57
 */
import { Committing } from '../types';
import { assert } from './index';

const GET_ERROR_MESSAGE = `需要通过 this.store.xxx 获取 store 中的状态`;
const SET_ERROR_MESSAGE = `需要通过 dispatch 修改 store 中的状态`;
const EMPTY = Object.create(null);

export default function defineProperty(
  instance: { data: Record<string, any>; store: AnyObject },
  committing: Committing,
  currentState: AnyObject,
  currentDispatch: AnyObject
): void {
  Object.defineProperty(instance.data, 'store', {
    get() {
      assert(!committing.state, GET_ERROR_MESSAGE);

      return EMPTY;
    },
    set() {
      assert(!committing.state, SET_ERROR_MESSAGE);
    },
    enumerable: false,
  });

  Object.defineProperty(instance, 'store', {
    get() {
      return { ...currentState, ...currentDispatch };
    },
    set() {
      assert(!committing.state, SET_ERROR_MESSAGE);
    },
  });
}
