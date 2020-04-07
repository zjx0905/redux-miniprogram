/*
 * @Author: early-autumn
 * @Date: 2020-04-04 13:06:27
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-07 18:11:10
 */
import { AnyObject, ConnectType } from '../types';

function executeHook(this: AnyObject, cur: Function, old: Function, query?: AnyObject) {
  cur.call(this);

  if (old !== undefined) {
    old.call(this, query);
  }
}

function pageLifetimes(options: AnyObject, load: () => void, unload: () => void) {
  const oldLoad = options.onLoad;
  const oldUnload = options.onUnload;

  function onLoad(this: AnyObject, query: AnyObject) {
    executeHook.call(this, load, oldLoad, query);
  }

  function onUnload(this: AnyObject) {
    executeHook.call(this, unload, oldUnload);
  }

  return { ...options, onLoad, onUnload };
}

function componentLifetimes(options: AnyObject, load: () => void, unload: () => void) {
  const oldLoad = options.lifetimes?.attached ?? options.attached;
  const oldUnload = options.lifetimes?.detached ?? options.detached;

  function attached(this: AnyObject) {
    executeHook.call(this, load, oldLoad);
  }

  function detached(this: AnyObject) {
    executeHook.call(this, unload, oldUnload);
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
