/*
 * @Author: early-autumn
 * @Date: 2020-04-05 13:20:18
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-05 14:30:34
 */

import { createStore } from 'redux';
import { useStore, useState, useDispatch } from '../src/hooks';

declare global {
  namespace NodeJS {
    interface Global {
      getApp: Function;
    }
  }
}

describe('测试 hooks.ts', () => {
  describe('测试 hooks.ts 异常', () => {
    beforeAll(() => {
      global.getApp = jest.fn(() => ({}));
    });

    it('测试 useStore 异常', () => {
      // 应该抛出异常
      expect(() => useStore()).toThrow();
    });

    it('测试 useState 异常', () => {
      // 应该抛出异常
      expect(() => useState()).toThrow();
    });

    it('测试 useDispatch 异常', () => {
      // 应该抛出异常
      expect(() => useDispatch()).toThrow();
    });
  });

  describe('测试 hooks.ts 正常', () => {
    const store = createStore((state = { a: 1 }) => state);

    beforeAll(() => {
      global.getApp = jest.fn(() => ({ store }));
    });

    it('测试 useStore 正常', () => {
      expect(useStore()).toBe(store);
    });

    it('测试 useState 正常', () => {
      expect(useState()).toBe(store.getState());
    });

    it('测试 useDispatch 正常', () => {
      expect(useDispatch()).toBe(store.dispatch);
    });
  });
});
