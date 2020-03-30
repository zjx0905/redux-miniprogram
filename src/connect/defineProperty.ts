/*
 * @Author: early-autumn
 * @Date: 2020-03-29 17:18:03
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-03-30 19:37:03
 */
import { Commit } from '../types';
import { useDispatch } from '../hooks';
import assert from '../utils/assert';

export default function defineProperty(
  instance: { data?: Record<string, any>; store: AnyObject },
  commit: Commit,
  connectStore: () => AnyObject
): void {
  const dispatch = useDispatch();

  Object.defineProperty(instance, 'store', {
    get() {
      return Object.freeze({ ...connectStore(), dispatch });
    },
  });

  Object.keys(instance.store).forEach((key) => {
    Object.defineProperty(instance.data, key, {
      set() {
        assert(!commit.state, `只能使用 dispatch 方法改变 store 中的状态 ${key} `);
      },
    });
  });
}
