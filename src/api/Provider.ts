/*
 * @Author: early-autumn
 * @Date: 2020-03-25 14:59:14
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-13 16:22:40
 */
import { Store } from 'redux';
import { AnyObject, ProviderOptions } from '../types';

/**
 * 提供小程序唯一的 Redux Store
 *
 * @param store Redux Store
 *
 * @see[查看文档](https://github.com/early-autumn/redux-miniprogram#providerstoreoptions)
 */
export default function Provider<TStore extends Store>(store: TStore) {
  return function Provided<TAnyObject extends AnyObject>(
    options: ProviderOptions<TStore, TAnyObject>
  ): ProviderOptions<TStore, TAnyObject> {
    return { ...options, store };
  };
}
