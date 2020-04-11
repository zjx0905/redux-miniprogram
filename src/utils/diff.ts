/*
 * @Author: early-autumn
 * @Date: 2020-03-29 19:41:14
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-11 11:29:44
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

function equality(
  valA: AnyObject,
  valB: AnyObject,
  target: AnyObject,
  path: string[],
  type: 'array' | 'object'
) {
  // 严格相等 直接返回
  if (is(valA, valB)) {
    return;
  }

  if (typeof valA !== 'object' || valA === null || typeof valB !== 'object' || valB === null) {
    target[path.join('')] = valB;

    return;
  }

  const keys1 = Object.keys(valA).length;
  const keys2 = Object.keys(valB).length;

  if (keys1 !== keys2 || path.length === 5) {
    target[path.join('')] = valB;

    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  diff(valA, valB, target, path, type);
}

/**
 * 对比新旧状态
 *
 * 计算最小更新
 */
export default function diff(
  objA: AnyObject,
  objB: AnyObject,
  target: AnyObject = {},
  path: string[] = ['store'],
  type: 'array' | 'object' = 'object'
) {
  Object.keys(objB).forEach((key: string) => {
    const valA = objA[key];
    const valB = objB[key];
    const currentPath = [...path, type === 'array' ? `[${key}]` : `.${key}`];
    const currentType = Array.isArray(valB) ? 'array' : 'object';

    equality(valA, valB, target, currentPath, currentType);
  });

  return target;
}
