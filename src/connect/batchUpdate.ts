import { useStore, useState } from '../api/hooks';
import createCommit from './createCommit';

const commit = createCommit('async');
const listeners: ((state: AnyObject) => void)[] = [];
let subscribed = false;

function updating(): void {
  commit.run(() => {
    const state = useState();

    listeners.forEach((listener) => listener(state));
  });
}

// eslint-disable-next-line @typescript-eslint/ban-types
function subscribe(listener: (state: AnyObject) => void): Function {
  listeners.push(listener);

  if (subscribed === false) {
    subscribed = true;

    const store = useStore();
    store.subscribe(updating);
  }

  return function unsubscribe(): void {
    const index = listeners.indexOf(listener);
    if (index !== -1) {
      listeners.splice(index, 1);
    }
  };
}

export default {
  subscribe,
};
