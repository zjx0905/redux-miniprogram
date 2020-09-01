import { ConnectType } from '../types';

// eslint-disable-next-line @typescript-eslint/ban-types
function executeLifetime(this: AnyObject, cur: Function, old: Function, arg: unknown[]) {
  cur.call(this, ...arg);

  if (old !== void 0) {
    return old.call(this, ...arg);
  }
}

// eslint-disable-next-line @typescript-eslint/ban-types
function pageLifetimes(options: AnyObject, load: Function, unload: Function) {
  function onLoad(this: AnyObject, ...arg: unknown[]) {
    return executeLifetime.call(this, load, options.onLoad, arg);
  }

  function onUnload(this: AnyObject, ...arg: unknown[]) {
    return executeLifetime.call(this, unload, options.onUnload, arg);
  }

  return { ...options, onLoad, onUnload };
}

// eslint-disable-next-line @typescript-eslint/ban-types
function componentLifetimes(options: AnyObject, load: Function, unload: Function) {
  function attached(this: AnyObject, ...arg: unknown[]) {
    return executeLifetime.call(this, load, options.lifetimes?.attached ?? options.attached, arg);
  }

  function detached(this: AnyObject, ...arg: unknown[]) {
    return executeLifetime.call(this, unload, options.lifetimes?.detached ?? options.detached, arg);
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
  // eslint-disable-next-line @typescript-eslint/ban-types
  load: Function,
  // eslint-disable-next-line @typescript-eslint/ban-types
  unload: Function
): AnyObject {
  if (type === 'page') {
    return pageLifetimes(options, load, unload);
  }

  return componentLifetimes(options, load, unload);
}
