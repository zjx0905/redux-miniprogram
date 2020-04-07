/*
 * @Author: early-autumn
 * @Date: 2020-04-05 21:34:56
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-07 23:59:51
 */
import createCommit from '../../src/utils/createCommit';

describe('测试 utils/createCommit.ts', () => {
  it('测试 createCommit 同步', () => {
    const commit = createCommit('sync');

    // state 初始应该为 false
    expect(commit.state).toBeFalsy();

    commit.run(() => {
      // state 这时应该为 true
      expect(commit.state).toBeTruthy();
    });

    // 调用 end 后 state 应该为 false
    expect(commit.state).toBeFalsy();
  });

  it('测试 createCommit 异步', async () => {
    const commit = createCommit('async');

    // state 初始应该为 false
    expect(commit.state).toBeFalsy();

    await commit.run(() => {
      // state 这时应该为 true
      expect(commit.state).toBeTruthy();
    });

    // 调用 end 后 state 应该为 false
    expect(commit.state).toBeFalsy();
  });
});
