import { AnyObject } from '../types';

/**
 * 初始化 data
 *
 * 首次渲染需要 data 中混入订阅的 state
 *
 * @param options 创建实例需要的参数
 * @param state   订阅的 state
 */
export default function mixinInitData(options: AnyObject, state: AnyObject): AnyObject {
  return {
    ...options,
    data: { ...(options.data ?? {}), store: state },
  };
}
