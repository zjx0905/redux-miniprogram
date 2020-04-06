/*
 * @Author: early-autumn
 * @Date: 2020-04-04 14:31:09
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-06 15:15:11
 */
import { BaseOptions } from '../types';

export default function mixinData(options: BaseOptions, state: AnyObject): BaseOptions {
  return {
    ...options,
    data: { ...(options.data ?? {}), store: state },
  };
}
