/*
 * @Author: early-autumn
 * @Date: 2020-03-25 14:59:14
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-06 15:20:35
 */
import { Store } from 'redux';
import { ProviderOptions } from '../types';

/**
 *
 * @param store Redux Store
 * @param options App Options
 */
export default function Provider<ReduxStore extends Store, T extends AnyObject>(
  store: ReduxStore,
  options: ProviderOptions<ReduxStore, T>
) {
  return { ...options, store } as ProviderOptions<ReduxStore, T>;
}
