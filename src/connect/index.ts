import { MapStateToStore, MapDispatchToStore, ConnectType } from '../types';
import { useState, useDispatch } from '../api/hooks';
import diff from '../utils/diff';
import isEmptyObject from '../utils/isEmptyObject';
import verifyPlainObject from '../utils/verifyPlainObject';
import serializeCopy from '../utils/serializeCopy';
import createCommit from './createCommit';
import batchUpdate from './batchUpdate';
import proxyConnectStore from './proxyConnectStore';
import mixinInitData from './mixinInitData';
import mixinLifetimes from './mixinLifetimes';

const mapStateToStoreDefault: MapStateToStore = () => ({});

const mapDispatchToStoreDefault: MapDispatchToStore = (dispatch) => ({ dispatch });

export default function connect(
  type: ConnectType,
  mapStateToStore: MapStateToStore = mapStateToStoreDefault,
  mapDispatchToStore: MapDispatchToStore = mapDispatchToStoreDefault
) {
  return function connected(options: AnyObject): AnyObject {
    const commit = createCommit();
    const instances: AnyObject[] = [];
    const { state = {}, pureState = {} } = mapStateToStore(useState());

    verifyPlainObject('mapStateToStore() state', state);
    verifyPlainObject('mapStateToStore() pureState', pureState);

    const copyState = serializeCopy(state);
    const dispatch = mapDispatchToStore(useDispatch());

    verifyPlainObject('mapDispatchToStore()', dispatch);

    // eslint-disable-next-line @typescript-eslint/ban-types
    let unsubscribe: Function | undefined;

    function updater(rootState: AnyObject) {
      commit.run(() => {
        const { state: nextState, pureState: nextPureState } = mapStateToStore(rootState);

        if (nextPureState !== void 0) {
          Object.assign(pureState, nextPureState);
        }

        if (nextState === void 0) {
          return;
        }

        const updateState = diff(state, nextState);
        if (isEmptyObject(updateState)) {
          return;
        }

        Object.assign(state, nextState);

        // eslint-disable-next-line @typescript-eslint/ban-types
        instances.forEach((instance) => (instance.setData as Function)(updateState));
      });
    }

    function load(this: AnyObject): void {
      instances.push(this);
      proxyConnectStore(this, commit, state, pureState, copyState, dispatch);

      if (unsubscribe === void 0) {
        unsubscribe = batchUpdate.subscribe(updater);
      }
    }

    function unload(this: AnyObject): void {
      const index = instances.indexOf(this);

      instances.splice(index, 1);

      if (instances.length === 0 && unsubscribe !== void 0) {
        unsubscribe();
        unsubscribe = void 0;
      }
    }

    return mixinLifetimes(type, mixinInitData(options, copyState), load, unload);
  };
}
