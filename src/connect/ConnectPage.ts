/*
 * @Author: early-autumn
 * @Date: 2020-03-25 14:54:52
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-03 20:15:59
 */
import { PageOptions, ConnectPageInstance, ConnectPageOptions, Updater } from '../types';
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
  return function Connected<A extends PageOptions>(options: ConnectPageInstance<T, A>) {
    const committing = createCommitting();
    const currentState = mapStateToStore(useState());
    const currentDispatch = mapDispatchToStore(useDispatch());
    const load = options.onLoad;
    const unload = options.onUnload;
    let updater: Updater;
    let updateState: AnyObject;

    options.data = { ...options.data, store: currentState }; // data 中 添加 store 是为了首次渲染
    options.onLoad = function(query: Record<string, string | undefined>) {
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

      if (load !== undefined) {
        load.call(this, query);
      }
    };
    options.onUnload = function() {
      batchUpdate.unsubscribe(updater);

      if (unload !== undefined) {
        unload.call(this);
      }
    };

    return options as ConnectPageOptions<T, A>;
  };
}
