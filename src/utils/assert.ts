/**
 * 断言
 *
 * @param succeed 是否通过
 * @param message 不通过时的错误信息
 */
export default function assert(succeed: boolean, message: string): void {
  if (!succeed) {
    const errMsg = `[redux-miniprogram]
    ${message}`;

    throw new Error(errMsg);
  }
}
