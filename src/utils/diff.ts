/*
 * @Author: early-autumn
 * @Date: 2020-03-29 19:41:14
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-13 13:19:20
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
 * 对比值
 *
 * @param valueA 对比值
 * @param valB 对比值
 * @param target 对比结果
 * @param path 对比路径
 * @param type 对比类型
 */
function handler(
  valueA: any,
  valueB: any,
  target: AnyObject,
  path: string[],
  type: 'array' | 'object'
) {
  // 严格相等 直接返回
  if (is(valueA, valueB)) {
    return;
  }

  // 基本类型直接赋值
  if (
    typeof valueA !== 'object' ||
    valueA === null ||
    typeof valueB !== 'object' ||
    valueB === null
  ) {
    target[path.join('')] = valueB;

    return;
  }

  const keys1 = Object.keys(valueA).length;
  const keys2 = Object.keys(valueB).length;

  // keys 的长度不相等 直接赋值
  if (keys1 !== keys2 || path.length === 5) {
    target[path.join('')] = valueB;

    return;
  }

  // 递归
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  diff(valueA, valueB, target, path, type);
}

/**
 * 对比新旧状态
 *
 * 计算最小更新
 *
 * @param stateA 参与对比的旧状态
 * @param stateB 参与对比的新状态
 * @param target 对比结果
 * @param path 对比路径
 * @param type 对比类型
 */
export default function diff(
  stateA: AnyObject,
  stateB: AnyObject,
  // stateA: AnyObject | any[],
  // stateB: AnyObject | any[],
  target: AnyObject = {},
  path: string[] = ['store'],
  type: 'object' | 'array' = 'object'
) {
  Object.keys(stateA).forEach((key: string) => {
    const valueA = stateA[key];
    const valueB = stateB[key];
    const currentPath = [...path, type === 'array' ? `[${key}]` : `.${key}`];
    const currentType = Array.isArray(valueA) ? 'array' : 'object';

    handler(valueA, valueB, target, currentPath, currentType);
  });

  return target;
}
