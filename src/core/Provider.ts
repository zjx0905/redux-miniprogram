/*
 * @Author: early-autumn
 * @Date: 2020-03-25 14:59:14
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-06 21:51:52
 */
import { Store } from 'redux';
import { AnyObject, ProviderOptions } from '../types';

/**
 *
 * @param store Redux Store
 * @param options App Options
 */
export default function Provider<TStore extends Store>(store: TStore) {
  return function Provided<TObject extends AnyObject>(
    options: ProviderOptions<TStore, TObject>
  ): ProviderOptions<TStore, TObject> {
    return { ...options, store };
  };
}
