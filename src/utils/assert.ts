/*
 * @Author: early-autumn
 * @Date: 2020-04-04 19:14:44
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-04 19:15:05
 */
/**
 * 如果出错，则抛出异常。
 * @param error 是否出错
 * @param message 错误信息
 */
export default function assert(error: boolean, message: string): void {
  if (error) {
    throw new Error(`[redux-miniprogram]
    ${message}`);
  }
}