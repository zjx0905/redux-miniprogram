/*
 * @Author: early-autumn
 * @Date: 2020-03-25 14:54:52
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-03 20:15:44
 */
import {
  ComponentOptions,
  ConnectComponentInstance,
  ConnectComponentOptions,
  Updater,
} from '../types';
import { useState, useDispatch } from '../hooks';
import createCommitting from '../utils/createCommitting';
import proxy from '../utils/proxy';
import batchUpdate from '../utils/batchUpdate';
import { mapStateToStoreDefault, mapDispatchToStoreDefault } from './default';

/**
 *
 * @param mapStateToStore
 * @param mapDispatchToStore
 */
export default function ConnectComponent<T extends AnyObject>(
  mapStateToStore: <S extends AnyObject>(state: S) => AnyObject = mapStateToStoreDefault,
  mapDispatchToStore = mapDispatchToStoreDefault
) {
  return function Connected<A extends ComponentOptions>(options: ConnectComponentInstance<T, A>) {
    const committing = createCommitting();
    const currentState = mapStateToStore(useState());
    const currentDispatch = mapDispatchToStore(useDispatch());
    const load = options.lifetimes?.attached ?? options.attached;
    const unload = options.lifetimes?.detached ?? options.detached;
    let updater: Updater;
    let updateState: AnyObject;

    options.data = { ...options.data, store: currentState }; // data 中 添加 store 是为了首次渲染
    options.lifetimes = options.lifetimes ?? {};
    options.lifetimes.attached = options.attached = function() {
      proxy(this, committing, currentState, currentDispatch);

      updater = batchUpdate.create({
        getState: (): AnyObject => currentState,
        getNextState: mapStateToStore,
        setState: (state: AnyObject) => {
          updateState = state;

          if (committing.state === false) {
            committing.commit((end) => {
              setTimeout(() => (this as { setData?: Function }).setData?.(updateState, end));
            });
          }
        },
      });

      batchUpdate.subscribe(updater);

      if (load !== undefined) {
        load.call(this);
      }
    };
    options.lifetimes.detached = options.detached = function() {
      batchUpdate.unsubscribe(updater);

      if (unload !== undefined) {
        unload.call(this);
      }
    };

    return options as ConnectComponentOptions<T, A>;
  };
}
