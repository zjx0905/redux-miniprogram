/*
 * @Author: early-autumn
 * @Date: 2020-03-25 14:59:14
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-03 18:34:20
 */
import { Store } from 'redux';
import { AppOptions, ProviderInstance, ProviderOptions } from './types';

/**
 *
 * @param store
 */
export default function Provider<T extends Store, A extends AppOptions>(
  store: T,
  options: ProviderInstance<T, A>
) {
  return { ...options, store } as ProviderOptions<T, A>;
}
