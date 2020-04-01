/*
 * @Author: early-autumn
 * @Date: 2020-03-25 14:54:52
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-01 20:36:43
 */
import { PageOptions, ConnectPageInstance, ConnectPageOptions } from '../types';
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
export default function ConnectPage<T extends AnyObject>(
  mapStateToStore: <S extends AnyObject>(state: S) => AnyObject = mapStateToStoreDefault,
  mapDispatchToStore = mapDispatchToStoreDefault
) {
  return function ConnectStoreWithOptions<A extends PageOptions>(
    options: ConnectPageInstance<T, A>
  ) {
    const committing = createCommitting();
    const currentState = mapStateToStore(useState());
    const currentDispatch = mapDispatchToStore(useDispatch());
    const load = options.onLoad;
    const unload = options.onUnload;
    let unsubscribe: Function;

    options.data = { ...options.data, store: currentState };
    options.onLoad = function(query: Record<string, string | undefined>) {
      const instance = this as ConnectPageOptions<T, A>;
      proxy(instance, committing, currentState, currentDispatch);

      unsubscribe = batchUpdate.subscribe({
        getState: (): AnyObject => currentState,
        getNextState: mapStateToStore,
        setState: (updateState: AnyObject) => {
          committing.commit((end) => this.setData(updateState, end));
        },
      });

      if (load !== undefined) {
        load.call(this, query);
      }
    };
    options.onUnload = function() {
      if (unsubscribe !== undefined) {
        unsubscribe();
      }

      if (unload !== undefined) {
        unload.call(this);
      }
    };

    return options as ConnectPageOptions<T, A>;
  };
}
