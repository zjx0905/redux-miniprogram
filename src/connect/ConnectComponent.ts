/*
 * @Author: early-autumn
 * @Date: 2020-03-25 14:54:52
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-03-30 19:36:54
 */
import { ComponentOptions, ConnectComponentInstance, ConnectComponentOptions } from '../types';
import { useState, useDispatch } from '../hooks';
import isEmpty from '../utils/isEmpty';
import { mapStateToStoreDefault, mapDispatchToStoreDefault } from '../utils/default';
import createCommit from '../utils/createCommit';
import batchUpdate from './batchUpdate';
import defineProperty from './defineProperty';

export default function ConnectComponent<T extends AnyObject>(
  mapStateToStore: <S extends AnyObject>(state: S) => AnyObject = mapStateToStoreDefault,
  mapDispatchToStore = mapDispatchToStoreDefault
) {
  const commit = createCommit();
  let unsubscribe: Function;

  return function withOptions<A extends ComponentOptions>(
    options: ConnectComponentInstance<T, A>,
    shouldUpdate?: (state: AnyObject, nextState: AnyObject) => boolean
  ) {
    let currentState: AnyObject = mapStateToStore(useState());
    const mapDispatch = mapDispatchToStore(useDispatch());

    options.lifetimes = options.lifetimes ?? {};

    const load = options.lifetimes.attached ?? options.attached;
    const unload = options.lifetimes.detached ?? options.detached;

    options.data = { ...options.data, ...currentState };

    options.lifetimes.attached = options.attached = function() {
      defineProperty(this as ConnectComponentOptions<T, A>, commit, () => ({
        ...currentState,
        ...mapDispatch,
      }));

      if (!isEmpty(currentState)) {
        unsubscribe = batchUpdate({
          getState: (): AnyObject => currentState,
          setState: (nextState: AnyObject, updateState: AnyObject) => {
            commit.start(() => {
              currentState = nextState;

              (this as { setData?: Function }).setData?.(updateState, commit.end);
            });
          },
          getNextState: mapStateToStore,
          shouldUpdate,
        });
      }

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
