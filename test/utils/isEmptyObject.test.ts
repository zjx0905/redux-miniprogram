/*
 * @Author: early-autumn
 * @Date: 2020-04-05 20:52:44
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-05 20:56:30
 */
import isEmptyObject from '../../src/utils/isEmptyObject';

describe('测试 utils/isEmptyObject.ts', () => {
  it('测试 isEmptyObject', () => {
    // 是空对象
    expect(isEmptyObject({})).toBeTruthy();
    // 不是空对象
    expect(isEmptyObject({ a: 1 })).toBeFalsy();
  });
});
