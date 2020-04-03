/*
 * @Author: early-autumn
 * @Date: 2020-03-29 21:06:40
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-03 16:28:42
 */
import { UpdaterOptions, Updater } from '../types';
import { useStore, useState } from '../hooks';
import { isEmpty } from './index';
import createCommitting from './createCommitting';
import diff from './diff';

const committing = createCommitting();
const updaters: Updater[] = [];
let subscribed = false;

function updating(): void {
  if (committing.state === false) {
    committing.commit((end) => {
      Promise.resolve().then(() => {
        const state = useState();

        updaters.forEach((updater) => updater(state));
        end();
      });
    });
  }
}

function create(options: UpdaterOptions): Updater {
  return function updater(state) {
    const currentState = options.getState();
    const nextState = options.getNextState(state);
    const updateState = diff(currentState, nextState);

    if (!isEmpty(updateState)) {
      options.setState(updateState);
      Object.assign(currentState, nextState);
    }
  };
}

function subscribe(updater: Updater): void {
  updaters.push(updater);

  if (subscribed === false) {
    subscribed = true;

    const store = useStore();

    store.subscribe(updating);
  }
}

function unsubscribe(updater: Updater): void {
  const index = updaters.indexOf(updater);

  if (index !== -1) {
    updaters.splice(index, 1);
  }
}

export default {
  create,
  subscribe,
  unsubscribe,
};
