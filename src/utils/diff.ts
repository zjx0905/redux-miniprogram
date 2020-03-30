/*
 * @Author: early-autumn
 * @Date: 2020-03-29 19:41:14
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-03-30 19:21:59
 */
import shallowEqual from './shallowEqual';

export default function diff(objA: AnyObject, objB: AnyObject): AnyObject {
  const obj: AnyObject = {};
  const keys: string[] = Object.keys(objA);

  keys.forEach((key: string): void => {
    const valueA = objA[key];
    const valueB = objB[key];

    if (shallowEqual(valueA, valueB)) {
      return;
    }

    obj[key] = valueB;
  });

  return obj;
}
