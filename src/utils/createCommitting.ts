/*
 * @Author: early-autumn
 * @Date: 2020-03-29 17:29:05
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-07 21:38:14
 */
import { Committing } from '../types';

/**
 * 创建提交
 */
export default function createCommitting(): Committing {
  const committing: Committing = {
    state: false,

    commit(handler) {
      committing.state = true;

      handler();
    },

    end() {
      committing.state = false;
    },
  };

  return committing;
}
