import { AnyObject } from '../types';
import { useStore, useState } from '../api/hooks';
import createCommit from './createCommit';

/**
 * 异步提交
 */
const commit = createCommit('async');
/**
 * 侦听器集合
 */
const listeners: ((state: AnyObject) => void)[] = [];
/**
 * 是否已经订阅 Redux Store
 */
let subscribed = false;

/**
 * 异步更新
 */
function updating(): void {
  commit.run(() => {
    const state = useState();

    listeners.forEach((listener) => listener(state));
  });
}

/**
 * 订阅批量更新
 *
 * 返回用于取消订阅的函数
 *
 * @param listener 侦听器
 */
// eslint-disable-next-line @typescript-eslint/ban-types
function subscribe(listener: (state: AnyObject) => void): Function {
  listeners.push(listener);

  // 如果此时没有订阅 Redux Store
  // 那就订阅上吧
  // 只会订阅一次
  if (subscribed === false) {
    subscribed = true;

    const store = useStore();

    store.subscribe(updating);
  }

  return function unsubscribe(): void {
    const index = listeners.indexOf(listener);

    listeners.splice(index, 1);
  };
}

export default {
  subscribe,
};
