/*
 * @Author: early-autumn
 * @Date: 2020-03-29 17:29:05
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-09 09:47:51
 */
import { Commit } from '../types';

class CommitClass implements Commit {
  task: 'sync' | 'async';

  state: boolean;

  constructor(task: 'sync' | 'async' = 'sync') {
    this.task = task;
    this.state = false;
  }

  getState() {
    return this.state;
  }

  setState(state: boolean) {
    this.state = state;
  }

  run(handler: () => void) {
    if (this.getState() === true) {
      return;
    }

    this.setState(true);

    const execute = () => {
      handler();

      this.setState(false);
    };

    if (this.task === 'sync') {
      return execute();
    }

    return Promise.resolve().then(execute);
  }
}

/**
 * 创建提交
 */
export default function createCommit(task?: 'sync' | 'async'): Commit {
  return new CommitClass(task);
}
