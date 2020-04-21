/*
 * @Author: early-autumn
 * @Date: 2020-03-29 19:41:14
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-13 17:27:59
 */
import { AnyObject } from '../types';

/**
 * Object.is
 *
 * @param x 参与对比的值
 * @param y 参与对比的值
 */
function is(x: any, y: any) {
  if (x === y) {
    // 处理 +0 === -0 等于 true 的问题
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    // 处理 NaN === NaN 等于 false 的问题
    return x !== x && y !== y;
  }
}

/**
 * 对比处理函数
 *
 * @param oldValue 旧值
 * @param newValue 新值
 * @param target   对比结果
 * @param path     对比路径
 * @param next     继续对比
 */
function handler(
  oldValue: any,
  newValue: any,
  target: AnyObject,
  path: string[],
  next: () => void
) {
  // 严格相等
  // 直接返回
  if (is(oldValue, newValue)) {
    return;
  }

  // 基本类型
  // 直接赋新值并返回
  if (
    typeof oldValue !== 'object' ||
    oldValue === null ||
    typeof newValue !== 'object' ||
    newValue === null
  ) {
    target[path.join('')] = newValue;
    return;
  }

  // keys 的长度不相等 或者 path 深度大于等于 5
  // 直接赋新值并返回
  if (Object.keys(oldValue).length !== Object.keys(newValue).length || path.length >= 5) {
    target[path.join('')] = newValue;
    return;
  }

  next();
}

/**
 * 对比新旧状态
 *
 * 计算最小更新
 *
 * @param oldValue 参与对比的旧值
 * @param newValue 参与对比的新值
 * @param target   对比结果
 * @param path     对比路径
 * @param type     对比类型
 */
export default function diff(
  oldValue: AnyObject,
  newValue: AnyObject,
  // oldValue: AnyObject | any[],
  // newValue: AnyObject | any[],
  target: AnyObject = {},
  path: string[] = ['store'],
  type: 'object' | 'array' = 'object'
) {
  Object.keys(oldValue).forEach((key: string) => {
    const oldKeyValue = oldValue[key];
    const newKeyValue = newValue[key];
    const pathKey = type === 'array' ? `[${key}]` : `.${key}`;
    const newPath = [...path, pathKey];

    handler(oldKeyValue, newKeyValue, target, newPath, () => {
      const newType = Array.isArray(oldKeyValue) ? 'array' : 'object';

      diff(oldKeyValue, newKeyValue, target, newPath, newType);
    });
  });

  return target;
}
