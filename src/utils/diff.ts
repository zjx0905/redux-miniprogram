/*
 * @Author: early-autumn
 * @Date: 2020-03-29 19:41:14
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-05 00:53:30
 */
import shallowEqual from './shallowEqual';

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
