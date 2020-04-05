/*
 * @Author: early-autumn
 * @Date: 2020-04-04 14:31:09
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-05 20:14:15
 */
import { Options } from '../types';

export default function mixinData(options: Options, state: AnyObject): Options {
  return {
    ...options,
    data: { ...(options.data ?? {}), store: state },
  };
}
