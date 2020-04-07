/*
 * @Author: early-autumn
 * @Date: 2020-04-04 12:37:19
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-07 18:01:48
 */
import { AnyObject, MapStateToStore, MapDispatchToStore, ConnectType } from '../types';
import { useState, useDispatch } from '../hooks';
import createCommitting from '../utils/createCommitting';
import batchUpdate from '../utils/batchUpdate';
import verifyPlainObject from '../utils/verifyPlainObject';
import diff from '../utils/diff';
import isEmptyObject from '../utils/isEmptyObject';
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
  const committing = createCommitting();
  const currentState = mapStateToStore(useState());

  verifyPlainObject('mapStateToStore()', currentState);

  const currentDispatch = mapDispatchToStore(useDispatch());

  verifyPlainObject('mapDispatchToStore()', currentDispatch);

  const instances: AnyObject[] = [];
  let unsubscribe: Function | undefined;

  function updater(state: AnyObject) {
    committing.commit((end) => {
      const nextState = mapStateToStore(state);
      const updateState = diff(currentState, nextState);

      if (isEmptyObject(updateState)) {
        return;
      }

      Object.assign(currentState, nextState);

      instances.forEach((instance) => instance.setData(updateState));

      end();
    });
  }

  function load(this: AnyObject): void {
    proxyConnectStore(this, committing, currentState, currentDispatch);

    instances.push(this);

    if (unsubscribe === undefined) {
      unsubscribe = batchUpdate.subscribe(updater);
    }
  }

  function unload(this: AnyObject): void {
    const index = instances.indexOf(this);

    instances.splice(index, 1);

    if (instances.length === 0 && unsubscribe !== undefined) {
      unsubscribe();

      unsubscribe = undefined;
    }
  }

  return function connected(options: AnyObject): AnyObject {
    return mixinLifetimes(type, mixinInitData(options, currentState), load, unload);
  };
}
