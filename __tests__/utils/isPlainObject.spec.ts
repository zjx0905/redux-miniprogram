import isPlainObject from '../../src/utils/isPlainObject';

describe('测试 utils/isPlainObject.ts', () => {
  it('测试 isPlainObject', () => {
    // 是普通对象
    expect(isPlainObject({})).toBeTruthy();
    expect(isPlainObject(Object.create(null))).toBeTruthy();

    // 不是普通对象
    expect(isPlainObject(null)).toBeFalsy();
    expect(isPlainObject(void 0)).toBeFalsy();
    expect(isPlainObject(1)).toBeFalsy();
    expect(isPlainObject('')).toBeFalsy();
    expect(isPlainObject([])).toBeFalsy();
    expect(isPlainObject(NaN)).toBeFalsy();
    expect(isPlainObject(true)).toBeFalsy();
    expect(isPlainObject(new Function())).toBeFalsy();
    expect(
      isPlainObject(() => {
        1;
      })
    ).toBeFalsy();
  });
});
