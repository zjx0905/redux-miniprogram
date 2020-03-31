/*
 * @Author: early-autumn
 * @Date: 2020-03-29 21:06:40
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-03-31 21:47:08
 */
import { UpdaterOptions } from '../types';
import { useStore, useState } from '../hooks';
import isEmpty from './isEmpty';
import createCommitting from './createCommitting';
import diff from './diff';

const committing = createCommitting();
const updaters: Function[] = [];
let subscribed = false;

function createUpdater({ getState, getNextState, setState }: UpdaterOptions) {
  return function updater(state: AnyObject) {
    const currentState = getState();
    const nextState = getNextState(state);
    const updateState = diff(currentState, nextState);

    if (isEmpty(updateState)) {
      return;
    }

    setState(updateState);

    Object.assign(currentState, nextState);
  };
}

function updating(): void {
  if (committing.state === false) {
    committing.commit(() => {
      return Promise.resolve().then(() => {
        const state = useState();

        updaters.forEach((updater) => updater(state));
        committing.end();
      });
    });
  }
}

function subscribe(options: UpdaterOptions) {
  const updater = createUpdater(options);

  updaters.push(updater);

  if (subscribed === false) {
    subscribed = true;

    const store = useStore();

    store.subscribe(updating);
  }

  return function unsubscribe() {
    const index = updaters.indexOf(updater);

    updaters.splice(index, 1);
  };
}

export default {
  subscribe,
};
