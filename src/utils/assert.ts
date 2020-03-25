/*
 * @Author: early-autumn
 * @Date: 2020-03-25 14:24:01
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-03-25 14:32:18
 */

/**
 * 如果出错，则抛出异常。
 * @param error 是否出错
 * @param message 错误信息
 */
const assert = (error: boolean, message: string): void => {
  if (error) {
    throw new Error(`redux-miniprogram:
    ${message}`);
  }
};

export default assert;
