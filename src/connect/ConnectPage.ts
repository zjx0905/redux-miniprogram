/*
 * @Author: early-autumn
 * @Date: 2020-03-25 14:54:52
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-03-31 21:17:48
 */
import { PageOptions, ConnectPageInstance, ConnectPageOptions } from '../types';
import { useState, useDispatch } from '../hooks';
import { mapStateToStoreDefault, mapDispatchToStoreDefault } from '../utils/default';
import createCommitting from '../utils/createCommitting';
import proxy from '../utils/proxy';
import batchUpdate from '../utils/batchUpdate';

export default function ConnectPage<T extends AnyObject>(
  mapStateToStore: <S extends AnyObject>(state: S) => AnyObject = mapStateToStoreDefault,
  mapDispatchToStore = mapDispatchToStoreDefault
) {
  return function withOptions<A extends PageOptions>(options: ConnectPageInstance<T, A>) {
    const committing = createCommitting();
    const currentState = mapStateToStore(useState());
    const currentDispatch = mapDispatchToStore(useDispatch());
    const load = options.onLoad;
    const unload = options.onUnload;
    let unsubscribe: Function;

    options.data = { ...options.data, store: currentState };
    options.onLoad = function(query: Record<string, string | undefined>) {
      proxy(this as ConnectPageOptions<T, A>, committing, currentState, currentDispatch);

      unsubscribe = batchUpdate.subscribe({
        getState: (): AnyObject => currentState,
        getNextState: mapStateToStore,
        setState: (updateState: AnyObject) => {
          committing.commit(() => {
            this.setData(updateState, committing.end);
          });
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
