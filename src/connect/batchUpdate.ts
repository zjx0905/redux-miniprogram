/*
 * @Author: early-autumn
 * @Date: 2020-03-29 21:06:40
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-03-30 19:36:47
 */
import { UpdaterOptions } from '../types';
import { useStore, useState } from '../hooks';
import isEmpty from '../utils/isEmpty';
import createCommit from '../utils/createCommit';
import diff from '../utils/diff';

const commit = createCommit();
const updaters: Function[] = [];

let subscribed = false;

function createUpdater({ getState, setState, getNextState, shouldUpdate }: UpdaterOptions) {
  return function updater(rootState: AnyObject) {
    const state = getState();
    const nextState = getNextState(rootState);

    if (shouldUpdate !== undefined && !shouldUpdate(state, nextState)) {
      return;
    }

    if (isEmpty(state)) {
      return;
    }

    const updateState = diff(state, nextState);

    if (isEmpty(updateState)) {
      return;
    }

    setState(nextState, updateState);
  };
}

function updating(): void {
  commit.start(() => {
    Promise.resolve().then(() => {
      const state = useState();

      updaters.forEach((updater) => updater(state));

      commit.end();
    });
  });
}

export default function batchUpdate(options: UpdaterOptions) {
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
