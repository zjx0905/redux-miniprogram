export default function assert(succeed: boolean, message: string): void {
  if (!succeed) {
    const errMsg = `[redux-miniprogram]
    ${message}`;

    throw new Error(errMsg);
  }
}
