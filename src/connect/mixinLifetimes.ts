/*
 * @Author: early-autumn
 * @Date: 2020-04-04 13:06:27
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-07 18:46:28
 */
import { AnyObject, ConnectType } from '../types';

/**
 * 执行生命周期逻辑
 *
 * @param this 当前实例
 * @param cur 新增逻辑
 * @param old 原始逻辑
 * @param arg 额外的参数数组
 */
function executeLifetime(this: AnyObject, cur: Function, old: Function, arg: any[]) {
  cur.call(this, ...arg);

  if (old !== undefined) {
    old.call(this, ...arg);
  }
}

/**
 * 混合新增逻辑和原始逻辑
 *
 * 创建新的函数替换原始函数
 *
 * @param options Page Opatins
 * @param load 新增加载逻辑
 * @param unload 新增卸载逻辑
 */
function pageLifetimes(options: AnyObject, load: Function, unload: Function) {
  function onLoad(this: AnyObject, ...arg: any[]) {
    executeLifetime.call(this, load, options.onLoad, arg);
  }

  function onUnload(this: AnyObject, ...arg: any[]) {
    executeLifetime.call(this, unload, options.onUnload, arg);
  }

  return { ...options, onLoad, onUnload };
}

/**
 * 混合新增逻辑和原始逻辑
 *
 * 创建新的函数替换原始函数
 *
 * @param options Component Opatins
 * @param load 新增加载逻辑
 * @param unload 新增卸载逻辑
 */
function componentLifetimes(options: AnyObject, load: Function, unload: Function) {
  function attached(this: AnyObject, ...arg: any[]) {
    executeLifetime.call(this, load, options.lifetimes?.attached ?? options.attached, arg);
  }

  function detached(this: AnyObject, ...arg: any[]) {
    executeLifetime.call(this, unload, options.lifetimes?.detached ?? options.detached, arg);
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

/**
 * 混入新的生命周期函数
 *
 * @param type 连接的类型
 * @param options 创建实例需要的参数
 * @param load 新增加载逻辑
 * @param unload 新增卸载逻辑
 */
export default function mixinLifetimes(
  type: ConnectType,
  options: AnyObject,
  load: Function,
  unload: Function
) {
  if (type === 'page') {
    return pageLifetimes(options, load, unload);
  }

  return componentLifetimes(options, load, unload);
}
