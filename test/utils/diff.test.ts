/*
 * @Author: early-autumn
 * @Date: 2020-03-30 19:10:52
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-03-30 19:53:09
 */
import diff from '../../src/utils/diff';

describe('测试 utils/diff', () => {
  it('diff equal', () => {
    expect(diff({}, {})).toEqual({});

    expect(
      diff(
        { a: { v: 1 }, b: [1, 2, 3], c: null, d: undefined, e: 0, f: '', g: NaN },
        { a: { v: 1 }, b: [1, 2, 3], c: null, d: undefined, e: 0, f: '', g: NaN }
      )
    ).toEqual({});
  });

  it('diff Not equal', () => {
    expect(diff({ a: 1 }, { a: 2 })).toEqual({ a: 2 });

    expect(
      diff(
        { a: { v: 1 }, b: [1, 2, 3], c: null, d: undefined, e: 1, f: '', g: 1 },
        { a: { v: {} }, b: [1, 2, 3, []], c: 1, d: 5, e: 2, f: '1', g: NaN }
      )
    ).toEqual({ a: { v: {} }, b: [1, 2, 3, []], c: 1, d: 5, e: 2, f: '1', g: NaN });
  });
});
