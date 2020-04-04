/*
 * @Author: early-autumn
 * @Date: 2020-04-04 14:31:09
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-04 14:35:19
 */
import { ConnectOptions } from '../types';

export default function mixinData(options: ConnectOptions, state: AnyObject): ConnectOptions {
  return {
    ...options,
    data: { ...options.data, store: state },
  };
}
