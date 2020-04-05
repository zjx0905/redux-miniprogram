/*
 * @Author: early-autumn
 * @Date: 2020-04-05 21:34:56
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-05 21:39:05
 */
import createCommitting from '../../src/utils/createCommitting';

describe('测试 utils/createCommitting.ts', () => {
  it('测试 createCommitting', () => {
    const committing = createCommitting();

    // state 初始应该为 false
    expect(committing.state).toBeFalsy();

    committing.commit((end) => {
      // state 这时应该为 true
      expect(committing.state).toBeTruthy();

      end();

      // 调用 end 后 state 应该为 false
      expect(committing.state).toBeFalsy();
    });
  });
});
