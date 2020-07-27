import { AnyObject, Commit } from '../types';
import assert from '../utils/assert';

const GET_ERROR_MESSAGE = `需要通过 this.store.xxx 获取 store 中的状态`;
const SET_ERROR_MESSAGE = `需要通过 dispatch 修改 store 中的状态`;

/**
 * 把 Connect Store 代理为当前实例的 store 属性
 *
 * 并劫持 data 中的 store 属性 接手控制权 防止用户手动篡改数据
 *
 * @param instance   当前实例
 * @param commit     提交
 * @param state      订阅的状态
 * @param pureState  纯状态
 * @param copyState  订阅的状态副本
 * @param dispatch   包装过的 dispatch
 */
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
