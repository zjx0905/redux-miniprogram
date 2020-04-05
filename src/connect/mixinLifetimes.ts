/*
 * @Author: early-autumn
 * @Date: 2020-04-04 13:06:27
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-05 22:07:27
 */
import { ConnectType, Options } from '../types';

function paqeLifetimes(options: Options, load: () => void, unload: () => void) {
  const oldLoad = options.onLoad;
  const oldUnload = options.onUnload;

  options.onLoad = function(query: any) {
    load.call(this);

    if (oldLoad !== undefined) {
      oldLoad.call(this, query);
    }
  };
  options.onUnload = function() {
    unload.call(this);

    if (oldUnload !== undefined) {
      oldUnload.call(this);
    }
  };

  return options;
}

function componentLifetimes(options: Options, load: () => void, unload: () => void) {
  const oldLoad = options.lifetimes?.attached ?? options.attached;
  const oldUnload = options.lifetimes?.detached ?? options.detached;

  options.lifetimes = options.lifetimes ?? {};
  options.lifetimes.attached = options.attached = function() {
    load.call(this);

    if (oldLoad !== undefined) {
      oldLoad.call(this);
    }
  };
  options.lifetimes.detached = options.detached = function() {
    unload.call(this);

    if (oldUnload !== undefined) {
      oldUnload.call(this);
    }
  };

  return options;
}

export default function mixinLifetimes(
  type: ConnectType,
  options: Options,
  load: () => void,
  unload: () => void
) {
  if (type === 'page') {
    return paqeLifetimes(options, load, unload);
  }

  return componentLifetimes(options, load, unload);
}
