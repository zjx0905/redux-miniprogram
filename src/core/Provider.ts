/*
 * @Author: early-autumn
 * @Date: 2020-03-25 14:59:14
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-05 20:04:49
 */
import { Store } from 'redux';
import { ProviderOptions } from '../types';

/**
 *
 * @param store
 */
export default function Provider<T extends Store, Y extends AnyObject>(
  store: T,
  options: ProviderOptions<T, Y>
) {
  return { ...options, store } as ProviderOptions<T, Y>;
}
