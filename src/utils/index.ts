/*
 * @Author: early-autumn
 * @Date: 2020-04-01 10:07:34
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-01 20:29:52
 */

/**
 * 如果出错，则抛出异常。
 * @param error 是否出错
 * @param message 错误信息
 */
export function assert(error: boolean, message: string): void {
  if (error) {
    throw new Error(`[redux-miniprogram]:
    ${message}`);
  }
}

/**
 * 值是是空的吗?
 * @param value
 */
export function isEmpty(value: any): boolean {
  return (
    value === null ||
    value === undefined ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    value === 0 ||
    value === ''
  );
}
