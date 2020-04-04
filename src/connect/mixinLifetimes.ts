/*
 * @Author: early-autumn
 * @Date: 2020-04-04 13:06:27
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-04 15:28:42
 */
import { ConnectType, ConnectOptions } from '../types';

function paqeLifetimes(options: ConnectOptions, load: () => void, unload: () => void) {
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

function componentLifetimes(options: ConnectOptions, load: () => void, unload: () => void) {
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
  options: ConnectOptions,
  load: () => void,
  unload: () => void
) {
  if (type === 'page') {
    return paqeLifetimes(options, load, unload);
  }

  return componentLifetimes(options, load, unload);
}
