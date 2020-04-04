/*
 * @Author: early-autumn
 * @Date: 2020-04-04 12:37:19
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-04 19:44:37
 */
import { MapStateToStore, MapDispatchToStore, ConnectInstance, ConnectType } from '../types';
import { useState, useDispatch } from '../hooks';
import createCommitting from '../utils/createCommitting';
import batchUpdate from '../utils/batchUpdate';
import diff from '../utils/diff';
import isEmptyObject from '../utils/isEmptyObject';
import verifyPlainObject from '../utils/verifyPlainObject';
import { mapStateToStoreDefault, mapDispatchToStoreDefault } from './default';
import proxy from './proxy';
import mixinLifetimes from './mixinLifetimes';
import mixinData from './mixinData';

export default function connect(
  type: ConnectType,
  mapStateToStore: MapStateToStore = mapStateToStoreDefault,
  mapDispatchToStore: MapDispatchToStore = mapDispatchToStoreDefault
) {
  return function connected(options: ConnectInstance) {
    const committing = createCommitting();
    const currentDispatch = mapDispatchToStore(useDispatch());

    let currentState = mapStateToStore(useState());

    verifyPlainObject('mapStateToStore()', currentState);

    verifyPlainObject('mapDispatchToStore()', currentDispatch);

    verifyPlainObject('Options', options);

    let unsubscribe: Function;

    let updateCache: AnyObject[] = [];

    function getUpdateCache(): AnyObject[] {
      const cache = updateCache;

      updateCache = [];

      return cache;
    }

    function updater(updating: Function) {
      return function listener(state: AnyObject) {
        const nextState = mapStateToStore(state);
        const updateState = diff(currentState, nextState);

        if (isEmptyObject(updateState)) {
          return;
        }

        updateCache.push(updateState);

        currentState = nextState;

        updating();
      };
    }

    function load(this: ConnectInstance): void {
      proxy(this, committing, currentState, currentDispatch);

      const updating = () => {
        if (committing.state === true) {
          return;
        }

        committing.commit((end) => {
          setTimeout(() => {
            const updateCatch = getUpdateCache();
            const updateState = updateCatch.reduce((current, next) => {
              return { ...current, ...next };
            }, {});

            this.setData(updateState, end);
          });
        });
      };

      unsubscribe = batchUpdate.subscribe(updater(updating));
    }

    function unload(): void {
      unsubscribe();
    }

    return mixinLifetimes(type, mixinData({ ...options }, currentState), load, unload);
  };
}
