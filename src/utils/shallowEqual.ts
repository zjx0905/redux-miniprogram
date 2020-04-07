/*
 * @Author: early-autumn
 * @Date: 2020-03-30 19:21:29
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-07 21:35:10
 */
function is(x: any, y: any) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}

/**
 * 浅相等
 *
 * @param objA 第一个值
 * @param objB 第二个值
 */
export default function shallowEqual(objA: any, objB: any) {
  if (is(objA, objB)) return true;

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  for (let i = 0; i < keysA.length; i++) {
    if (
      !Object.prototype.hasOwnProperty.call(objB, keysA[i]) ||
      !is(objA[keysA[i]], objB[keysA[i]])
    ) {
      return false;
    }
  }

  return true;
}
