/*
 * @Author: early-autumn
 * @Date: 2020-04-04 14:31:09
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-06 21:50:52
 */
import { AnyObject } from '../types';

export default function mixinInitData(options: AnyObject, state: AnyObject): AnyObject {
  return {
    ...options,
    data: { ...(options.data ?? {}), store: state },
  };
}
