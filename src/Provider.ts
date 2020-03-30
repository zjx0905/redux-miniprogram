/*
 * @Author: early-autumn
 * @Date: 2020-03-25 14:59:14
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-03-29 22:07:11
 */
import { Store } from 'redux';
import { AppOptions, ProviderInstance, ProviderOptions } from './types';

export default function Provider<T extends Store>(store: T) {
  return function withOptions<A extends AppOptions>(options: ProviderInstance<T, A>) {
    return { ...options, store } as ProviderOptions<T, A>;
  };
}
