/*
 * @Author: early-autumn
 * @Date: 2020-03-29 17:18:03
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-06 14:54:00
 */
import { Committing } from '../types';
import assert from '../utils/assert';

const GET_ERROR_MESSAGE = `需要通过 this.store.xxx 获取 store 中的状态`;
const SET_ERROR_MESSAGE = `需要通过 dispatch 修改 store 中的状态`;

export default function defineProperty(
  instance: AnyObject,
  committing: Committing,
  currentState: AnyObject,
  currentDispatch: AnyObject
): void {
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

  Object.defineProperty(instance, 'store', {
    get() {
      return { ...currentState, ...currentDispatch };
    },
    set() {
      assert(!committing.state, SET_ERROR_MESSAGE);
    },
  });
}
