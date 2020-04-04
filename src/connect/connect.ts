/*
 * @Author: early-autumn
 * @Date: 2020-04-04 12:37:19
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-04 13:51:21
 */
import {
  MapStateToStore,
  MapDispatchToStore,
  ConnectInstance,
  ConnectType,
  Updater,
} from '../types';
import { useState, useDispatch } from '../hooks';
import createCommitting from '../utils/createCommitting';
import batchUpdate from '../utils/batchUpdate';
import { mapStateToStoreDefault, mapDispatchToStoreDefault } from './default';
import proxy from './proxy';
import mixinLifetimes from './mixinLifetimes';

export default function connect(
  type: ConnectType,
  mapStateToStore: MapStateToStore = mapStateToStoreDefault,
  mapDispatchToStore: MapDispatchToStore = mapDispatchToStoreDefault
) {
  return function connected(options: ConnectInstance) {
    const committing = createCommitting();
    const currentState = mapStateToStore(useState());
    const currentDispatch = mapDispatchToStore(useDispatch());

    let updater: Updater;
    let updateState: AnyObject;

    function load(this: ConnectInstance): void {
      proxy(this, committing, currentState, currentDispatch);

      updater = batchUpdate.create({
        getState: (): AnyObject => currentState,
        getNextState: mapStateToStore,
        setState: (state: AnyObject) => {
          updateState = state;
          if (committing.state === false) {
            committing.commit((end) => {
              setTimeout(() => this.setData(updateState, end));
            });
          }
        },
      });

      batchUpdate.subscribe(updater);
    }

    function unload(): void {
      batchUpdate.unsubscribe(updater);
    }

    return mixinLifetimes(type, options, load, unload);
  };
}
