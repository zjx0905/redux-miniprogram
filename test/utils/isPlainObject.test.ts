/*
 * @Author: early-autumn
 * @Date: 2020-04-05 20:52:44
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-05 21:00:19
 */
import isPlainObject from '../../src/utils/isPlainObject';

describe('测试 utils/isPlainObject.ts', () => {
  it('测试 isPlainObject', () => {
    // 是普通对象
    expect(isPlainObject({})).toBeTruthy();
    expect(isPlainObject(Object.create(null))).toBeTruthy();

    // 不是普通对象
    expect(isPlainObject(null)).toBeFalsy();
    expect(isPlainObject(undefined)).toBeFalsy();
    expect(isPlainObject(1)).toBeFalsy();
    expect(isPlainObject('')).toBeFalsy();
    expect(isPlainObject([])).toBeFalsy();
    expect(isPlainObject(NaN)).toBeFalsy();
    expect(isPlainObject(true)).toBeFalsy();
    expect(isPlainObject(Object)).toBeFalsy();
    expect(
      isPlainObject(() => {
        1;
      })
    ).toBeFalsy();
  });
});
