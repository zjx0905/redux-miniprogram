/*
 * @Author: early-autumn
 * @Date: 2020-03-25 14:54:52
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-03 00:25:33
 */
import { PageOptions, ConnectPageInstance, ConnectPageOptions, Updater } from '../types';
import { useState, useDispatch } from '../hooks';
import createCommitting from '../utils/createCommitting';
import proxy from '../utils/proxy';
import batchUpdate from '../utils/batchUpdate';
import { mapStateToStoreDefault, mapDispatchToStoreDefault } from './default';
import { Dispatch } from 'redux';

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
    const store = {
      ...mapStateToStore(useState()),
      ...mapDispatchToStore(useDispatch()),
      dispatch: useDispatch(),
    } as T & { dispatch: Dispatch };
    const load = options.onLoad;
    const unload = options.onUnload;
    let updater: Updater;

    options.data = { ...options.data, store }; // data 中 添加 store 是为了首次渲染
    options.onLoad = function(query: Record<string, string | undefined>) {
      proxy(this, committing, store);

      updater = batchUpdate.create({
        getState: (): AnyObject => store,
        getNextState: mapStateToStore,
        setState: (updateState: AnyObject) => {
          committing.commit((end) => this.setData(updateState, end));
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
