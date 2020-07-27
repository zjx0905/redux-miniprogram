import { createStore } from 'redux';
import Provider from '../../src/api/Provider';

describe('测试 core/Provider.ts', () => {
  it('测试 App Options', () => {
    const store = createStore(() => ({}));
    const options = {};

    const appOptions = Provider(store)(options);

    // appOptions 上面应该有一个 store 属性
    expect(appOptions.store).toBe(store);
  });
});
