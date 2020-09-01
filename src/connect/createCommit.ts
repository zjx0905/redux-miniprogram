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

export default function createCommit(task?: 'sync' | 'async'): Commit {
  return new CommitClass(task);
}
