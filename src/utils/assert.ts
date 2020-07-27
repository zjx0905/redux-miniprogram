/**
 * 如果出错，则抛出异常。
 * @param error 是否出错
 * @param message 错误信息
 */
export default function assert(error: boolean, message: string): void {
  if (error) {
    const errMsg = `[redux-miniprogram]
    ${message}`;

    throw new Error(errMsg);
  }
}
