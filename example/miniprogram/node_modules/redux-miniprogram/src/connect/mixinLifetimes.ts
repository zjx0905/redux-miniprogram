/*
 * @Author: early-autumn
 * @Date: 2020-04-04 13:06:27
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-06 21:51:02
 */
import { AnyObject, ConnectType } from '../types';

function pageLifetimes(options: AnyObject, load: () => void, unload: () => void) {
  const oldLoad = options.onLoad;
  const oldUnload = options.onUnload;

  function onLoad(this: AnyObject, query: any) {
    load.call(this);

    if (oldLoad !== undefined) {
      oldLoad.call(this, query);
    }
  }

  function onUnload(this: AnyObject) {
    unload.call(this);

    if (oldUnload !== undefined) {
      oldUnload.call(this);
    }
  }

  return { ...options, onLoad, onUnload };
}

function componentLifetimes(options: AnyObject, load: () => void, unload: () => void) {
  const oldLoad = options.lifetimes?.attached ?? options.attached;
  const oldUnload = options.lifetimes?.detached ?? options.detached;

  function attached(this: AnyObject) {
    load.call(this);

    if (oldLoad !== undefined) {
      oldLoad.call(this);
    }
  }

  function detached(this: AnyObject) {
    unload.call(this);

    if (oldUnload !== undefined) {
      oldUnload.call(this);
    }
  }

  return {
    ...options,
    attached,
    detached,
    lifetimes: {
      ...(options.lifetimes ?? {}),
      attached,
      detached,
    },
  };
}

export default function mixinLifetimes(
  type: ConnectType,
  options: AnyObject,
  load: () => void,
  unload: () => void
) {
  if (type === 'page') {
    return pageLifetimes(options, load, unload);
  }

  return componentLifetimes(options, load, unload);
}
