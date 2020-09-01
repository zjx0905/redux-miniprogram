import { Commit } from '../types';
import assert from '../utils/assert';

const GET_ERROR_MESSAGE = `需要通过 this.store.xxx 获取 store 中的状态`;
const SET_ERROR_MESSAGE = `需要通过 dispatch 修改 store 中的状态`;

export default function proxyConnectStore(
  instance: AnyObject,
  commit: Commit,
  state: AnyObject,
  pureState: AnyObject,
  copyState: AnyObject,
  dispatch: AnyObject
): void {
  Object.defineProperty(instance, 'store', {
    get() {
      return { ...state, ...pureState, ...dispatch };
    },
    set() {
      assert(commit.getState(), SET_ERROR_MESSAGE);
    },
  });

  Object.defineProperty(instance.data, 'store', {
    get() {
      assert(commit.getState(), GET_ERROR_MESSAGE);

      return copyState;
    },
    set() {
      assert(commit.getState(), SET_ERROR_MESSAGE);
    },
    enumerable: false,
  });
}
