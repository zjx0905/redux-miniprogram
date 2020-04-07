/*
 * @Author: early-autumn
 * @Date: 2020-03-29 19:41:14
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-07 21:33:28
 */
import { AnyObject } from '../types';
import shallowEqual from './shallowEqual';

/**
 * 对比新旧状态
 *
 * 计算最小更新
 *
 * @param objA 旧的状态
 * @param objB 新的状态
 */
export default function diff(objA: AnyObject, objB: AnyObject): AnyObject {
  const obj: AnyObject = {};

  Object.keys(objB).forEach((key: string): void => {
    const valueA = objA[key];
    const valueB = objB[key];

    if (shallowEqual(valueA, valueB)) {
      return;
    }

    obj[`store.${key}`] = valueB;
  });

  return obj;
}
