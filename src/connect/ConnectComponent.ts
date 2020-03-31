/*
 * @Author: early-autumn
 * @Date: 2020-03-25 14:54:52
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-03-31 21:17:41
 */
import { ComponentOptions, ConnectComponentInstance, ConnectComponentOptions } from '../types';
import { useState, useDispatch } from '../hooks';
import { mapStateToStoreDefault, mapDispatchToStoreDefault } from '../utils/default';
import createCommitting from '../utils/createCommitting';
import proxy from '../utils/proxy';
import batchUpdate from '../utils/batchUpdate';

export default function ConnectComponent<T extends AnyObject>(
  mapStateToStore: <S extends AnyObject>(state: S) => AnyObject = mapStateToStoreDefault,
  mapDispatchToStore = mapDispatchToStoreDefault
) {
  return function withOptions<A extends ComponentOptions>(options: ConnectComponentInstance<T, A>) {
    const committing = createCommitting();
    const currentState = mapStateToStore(useState());
    const currentDispatch = mapDispatchToStore(useDispatch());
    const load = options.lifetimes?.attached ?? options.attached;
    const unload = options.lifetimes?.detached ?? options.detached;
    let unsubscribe: Function;

    options.data = { ...options.data, store: currentState };
    options.lifetimes = options.lifetimes ?? {};
    options.lifetimes.attached = options.attached = function() {
      proxy(this as ConnectComponentOptions<T, A>, committing, currentState, currentDispatch);

      unsubscribe = batchUpdate.subscribe({
        getState: (): AnyObject => currentState,
        setState: (updateState: AnyObject) => {
          committing.commit(() => {
            (this as { setData?: Function }).setData?.(updateState, committing.end);
          });
        },
        getNextState: mapStateToStore,
      });

      if (load !== undefined) {
        load.call(this);
      }
    };
    options.lifetimes.detached = options.detached = function() {
      if (unsubscribe !== undefined) {
        unsubscribe();
      }

      if (unload !== undefined) {
        unload.call(this);
      }
    };

    return options as ConnectComponentOptions<T, A>;
  };
}
