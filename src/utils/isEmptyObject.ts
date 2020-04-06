/*
 * @Author: early-autumn
 * @Date: 2020-04-04 19:13:32
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-06 21:53:20
 */
/**
 * 是一个空的对象吗?
 *
 * @param obj 要检查的对象
 */
export default function isEmptyObject(obj: any): boolean {
  return obj !== null && typeof obj === 'object' && Object.keys(obj).length === 0;
}
