import diff from '../../src/utils/diff';

describe('测试 utils/diff.ts', () => {
  it('diff equal', () => {
    expect(diff({}, {})).toEqual({});

    expect(
      diff(
        { a: { v: 1 }, b: [1, 2, 3], c: null, d: void 0, e: 0, f: '', g: NaN },
        { a: { v: 1 }, b: [1, 2, 3], c: null, d: void 0, e: 0, f: '', g: NaN }
      )
    ).toEqual({});
  });

  it('diff Not equal', () => {
    expect(diff({ a: 1 }, { a: 2 })).toEqual({ 'store.a': 2 });

    expect(
      diff(
        { a: { v: 1 }, b: [1, 2, 3], c: null, d: void 0, e: 1, f: '', g: 1 },
        { a: { v: {} }, b: [1, 2, 3, []], c: 1, d: 5, e: 2, f: '1', g: NaN }
      )
    ).toEqual({
      'store.a.v': {},
      'store.b': [1, 2, 3, []],
      'store.c': 1,
      'store.d': 5,
      'store.e': 2,
      'store.f': '1',
      'store.g': NaN,
    });
  });
});
