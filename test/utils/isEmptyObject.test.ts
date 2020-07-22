import isEmptyObject from '../../src/utils/isEmptyObject';

describe('测试 utils/isEmptyObject.ts', () => {
  it('测试 isEmptyObject', () => {
    // 是空对象
    expect(isEmptyObject({})).toBeTruthy();
    // 不是空对象
    expect(isEmptyObject({ a: 1 })).toBeFalsy();
  });
});
