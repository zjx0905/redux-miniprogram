/*
 * @Author: early-autumn
 * @Date: 2020-03-25 14:54:52
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-03-30 19:23:11
 */
import { PageOptions, ConnectPageInstance, ConnectPageOptions } from '../types';
import { useState, useDispatch } from '../hooks';
import isEmpty from '../utils/isEmpty';
import { mapStateToStoreDefault, mapDispatchToStoreDefault } from '../utils/default';
import createCommit from '../utils/createCommit';
import batchUpdate from './batchUpdate';
import defineProperty from './defineProperty';

export default function ConnectPage<T extends AnyObject>(
  mapStateToStore: <S extends AnyObject>(state: S) => AnyObject = mapStateToStoreDefault,
  mapDispatchToStore = mapDispatchToStoreDefault
) {
  const commit = createCommit();
  let unsubscribe: Function;

  return function withOptions<A extends PageOptions>(
    options: ConnectPageInstance<T, A>,
    shouldUpdate?: (state: AnyObject, nextState: AnyObject) => boolean
  ) {
    let currentState = mapStateToStore(useState());

    const mapDispatch = mapDispatchToStore(useDispatch());

    const load = options.onLoad;
    const unload = options.onUnload;

    options.data = { ...options.data, ...currentState };

    options.onLoad = function(query: Record<string, string | undefined>) {
      defineProperty(this as ConnectPageOptions<T, A>, commit, () => ({
        ...currentState,
        ...mapDispatch,
      }));

      if (!isEmpty(currentState)) {
        unsubscribe = batchUpdate({
          getState: (): AnyObject => currentState,
          setState: (nextState: AnyObject, updateState: AnyObject) => {
            commit.start(() => {
              currentState = nextState;

              this.setData(updateState, commit.end);
            });
          },
          getNextState: mapStateToStore,
          shouldUpdate,
        });
      }

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
