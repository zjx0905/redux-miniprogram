/*
 * @Author: early-autumn
 * @Date: 2020-04-04 12:37:19
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-06 21:50:29
 */
import { AnyObject, MapStateToStore, MapDispatchToStore, ConnectType } from '../types';
import { useState, useDispatch } from '../hooks';
import createCommitting from '../utils/createCommitting';
import batchUpdate from '../utils/batchUpdate';
import verifyPlainObject from '../utils/verifyPlainObject';
import diff from '../utils/diff';
import isEmptyObject from '../utils/isEmptyObject';
import { mapStateToStoreDefault, mapDispatchToStoreDefault } from './default';
import proxy from './proxy';
import mixinData from './mixinData';
import mixinLifetimes from './mixinLifetimes';

export default function connect(
  type: ConnectType,
  mapStateToStore: MapStateToStore = mapStateToStoreDefault,
  mapDispatchToStore: MapDispatchToStore = mapDispatchToStoreDefault
) {
  const committing = createCommitting();
  const currentState = mapStateToStore(useState());
  const currentDispatch = mapDispatchToStore(useDispatch());

  verifyPlainObject('mapStateToStore()', currentState);
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

  return function connected(options: AnyObject): AnyObject {
    function load(this: AnyObject): void {
      proxy(this, committing, currentState, currentDispatch);

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

    return mixinLifetimes(type, mixinData(options, currentState), load, unload);
  };
}
