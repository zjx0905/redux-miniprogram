/*
 * @Author: early-autumn
 * @Date: 2020-03-29 17:29:05
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-03-30 16:50:44
 */
import { Commit } from '../types';

export default function createCommit(): Commit {
  return {
    state: false,

    start(handler: () => void): void {
      if (this.state === true) {
        return;
      }

      this.state = true;

      handler();
    },

    end(): void {
      this.state = false;
    },
  };
}
