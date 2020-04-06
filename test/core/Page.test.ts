/*
 * @Author: early-autumn
 * @Date: 2020-04-05 15:13:23
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-06 14:54:09
 */
import { createStore } from 'redux';
import ConnectPage from '../../src/core/Page';

declare global {
  namespace NodeJS {
    interface Global {
      getApp: Function;
    }
  }
}

const initState = { count: 0 };
const store = createStore((state = initState, action: { type: string; payload: number }) => {
  if (action.type === 'COUNT') {
    return {
      count: action.payload,
    };
  }

  return state;
});

global.getApp = jest.fn(() => ({ store }));

describe('测试 core/Page.ts', () => {
  it('测试 ConnectPage 默认参数', () => {
    const pageOptions = ConnectPage()({});

    // pageOptions.data.store 应该是一个空对象
    expect(pageOptions.data).toEqual({ store: {} });

    // pageOptions.onLoad 应该存在
    expect(pageOptions.onLoad).toBeDefined();

    // pageOptions.onUnload 应该存在
    expect(pageOptions.onUnload).toBeDefined();
  });

  it('测试 ConnectPage 最简参数', () => {
    const onLoad = jest.fn();
    const onUnload = jest.fn();
    const pageOptions = ConnectPage(
      () => ({ count: 0 }),
      () => ({
        dispatch: 0,
      })
    )({
      onLoad,
      onUnload,
    });

    // componentOptions.data.store 应该是订阅的状态
    expect(pageOptions.data).toEqual({ store: { count: 0 } });

    if (pageOptions.onLoad) {
      pageOptions.onLoad();

      // 应该被调用了
      expect(onLoad).toBeCalled();
    }

    if (pageOptions.onUnload) {
      pageOptions.onUnload();

      // 应该被调用了
      expect(onUnload).toBeCalled();
    }
  });

  it('测试 ConnectComponent mapStateToStore 异常', () => {
    const mapStateToStore = () => Object;

    expect(ConnectPage(mapStateToStore)).toThrow();
  });

  it('测试 ConnectComponent mapDispatchToStore 异常', () => {
    const mapStateToStore = () => ({});
    const mapDispatchToStore = () => Object;

    expect(ConnectPage(mapStateToStore, mapDispatchToStore)).toThrow();
  });

  it('测试 ConnectPage 更新状态', (done) => {
    const pageOptions = ConnectPage((state) => ({ count: state.count }))({
      data: { store: undefined },
      update() {
        // 直接赋值 this.store 应该报错
        expect(() => (this.store = {})).toThrow();

        // 批量更新
        this.store.dispatch({ type: 'COUNT', payload: 10 });
        this.store.dispatch({ type: 'COUNT', payload: 20 });

        // 批量更新是异步的 这个时候 count 应该还是 0
        expect(this.store.count).toBe(0);

        Promise.resolve().then(() => {
          // 这个时候 count 应该是更新后的 20
          expect(this.store.count).toBe(20);

          this.store.dispatch({ type: 'COUNT', payload: 20 });

          Promise.resolve().then(() => {
            expect(pageOptions.data.store).toBe('需要通过 this.store.xxx 获取 store 中的状态');

            if (pageOptions.onUnload) {
              pageOptions.onUnload();
              pageOptions.onUnload();
            }

            this.store.dispatch({ type: 'COUNT', payload: 30 });

            Promise.resolve().then(done);
          });
        });
      },
      setData(a: AnyObject) {
        a;
      },
    });

    if (pageOptions.onLoad) {
      pageOptions.onLoad({});

      // 直接获取 pageOptions.data.store 应该报错
      expect(() => pageOptions.data.store).toThrow();
      // 直接修改 pageOptions.data.store 应该报错
      expect(() => (pageOptions.data.store = undefined)).toThrow();

      // 触发更新
      pageOptions.update();
    }
  });
});
