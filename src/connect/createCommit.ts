/*
 * @Author: early-autumn
 * @Date: 2020-03-29 17:29:05
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-08 00:00:55
 */
import { Commit } from '../types';

class CommitClass implements Commit {
  task: 'sync' | 'async' = 'sync';
  state = false;

  constructor(task: 'sync' | 'async' = 'sync') {
    this.task = task;
  }

  run(handler: () => void) {
    if (this.state === true) {
      return;
    }

    this.state = true;

    const execute = () => {
      handler();

      this.state = false;
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
