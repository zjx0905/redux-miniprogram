/*
 * @Author: early-autumn
 * @Date: 2020-03-29 17:29:05
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-03-31 12:12:32
 */
import { Committing } from '../types';

export default function createCommitting(): Committing {
  const committing: Committing = {
    state: false,

    commit(handler) {
      committing.state = true;

      handler(committing.end);
    },

    end() {
      committing.state = false;
    },
  };

  return committing;
}
