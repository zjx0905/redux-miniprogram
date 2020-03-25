/*
 * @Author: early-autumn
 * @Date: 2020-03-25 14:32:30
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-03-25 14:40:28
 */
import assert from '../../src/utils/assert';

describe('utils/assert.ts', () => {
  it('测试正常情况', () => {
    expect(assert(false, 'test')).toBeUndefined();
  });

  it('测试异常情况', () => {
    expect(() => assert(true, 'test')).toThrow(`redux-miniprogram:
    test`);
  });
});
