/*
 * @Author: early-autumn
 * @Date: 2020-03-29 21:06:40
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-05 21:46:57
 */
import { useStore, useState } from '../hooks';
import createCommitting from './createCommitting';

const committing = createCommitting();
const listeners: ((state: AnyObject) => void)[] = [];
let subscribed = false;

function updating(): void {
  if (committing.state === true) {
    return;
  }

  committing.commit((end) => {
    Promise.resolve().then(() => {
      const state = useState();

      listeners.forEach((listener) => listener(state));

      end();
    });
  });
}

function subscribe(listener: (state: AnyObject) => void) {
  listeners.push(listener);

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
