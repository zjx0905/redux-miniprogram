/*
 * @Author: early-autumn
 * @Date: 2020-04-04 14:31:09
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-07 18:40:15
 */
import { AnyObject } from '../types';

/**
 * 初始化 data
 *
 * 首次渲染需要 data 中混入订阅的 state
 *
 * @param options 创建实例需要的参数
 * @param state 订阅的 state
 */
export default function mixinInitData(options: AnyObject, state: AnyObject): AnyObject {
  return {
    ...options,
    data: { ...(options.data ?? {}), store: state },
  };
}
