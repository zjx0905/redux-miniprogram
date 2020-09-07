import { createStore } from 'redux';
import ConnectComponent from '../../src/api/Component';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      // eslint-disable-next-line @typescript-eslint/ban-types
      getApp: Function;
    }
  }
}

const initState = { count: 1 };
const store = createStore((state = initState) => state);

global.getApp = jest.fn(() => ({ store }));

describe('测试 core/Component.ts', () => {
  it('测试 ConnectComponent 默认参数', () => {
    const componentOptions = ConnectComponent()({});

    // componentOptions.data.store 应该是一个空对象
    expect(componentOptions.data).toEqual({ store: {} });

    if (componentOptions.attached) {
      // componentOptions.attached 应该存在
      expect(componentOptions.attached).toBeDefined();

      componentOptions.attached();
    }

    if (componentOptions.detached) {
      // componentOptions.detached 应该存在
      expect(componentOptions.detached).toBeDefined();

      componentOptions.detached();
    }
  });

  it('测试 ConnectComponent 最简参数', () => {
    const attached = jest.fn();
    const detached = jest.fn();
    const componentOptions = ConnectComponent(
      () => ({ state: { count: 1 } }),
      () => ({
        dispatch: 1,
      })
    )({
      lifetimes: {
        attached,
        detached,
      },
    });

    const componentOptionsCopy = Object.create(componentOptions);

    // componentOptions.data.store 应该是订阅的状态
    expect(componentOptions.data).toEqual({ store: { count: 1 } });

    if (componentOptions.attached) {
      componentOptions.attached();

      componentOptionsCopy.attached();

      // 应该被调用了
      expect(attached).toBeCalled();
    }

    if (componentOptions.detached) {
      componentOptions.detached();

      componentOptionsCopy.detached();

      // 应该被调用了
      expect(detached).toBeCalled();
    }
  });

  it('测试 ConnectComponent mapStateToProps 异常', () => {
    const mapStateToProps = () => ({ pureState: Object });

    expect(ConnectComponent(mapStateToProps)).toThrow();
  });

  it('测试 ConnectComponent mapDispatchToProps 异常', () => {
    const mapStateToProps = () => ({});
    const mapDispatchToProps = () => Object;

    expect(ConnectComponent(mapStateToProps, mapDispatchToProps)).toThrow();
  });
});
