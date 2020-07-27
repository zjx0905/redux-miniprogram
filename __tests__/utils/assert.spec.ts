import assert from '../../src/utils/assert';

describe('测试 utils/assert.ts', () => {
  it('测试 assert 无异常', () => {
    expect(assert(true, '')).toBeUndefined();
  });

  it('测试 assert 异常信息是否正确', () => {
    expect(() => assert(false, 'test')).toThrow(`[redux-miniprogram]
    test`);
  });
});
