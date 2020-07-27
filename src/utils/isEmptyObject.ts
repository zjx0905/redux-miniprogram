/**
 * 是一个空的对象吗?
 *
 * @param obj 要检查的对象
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export default function isEmptyObject(obj: object): boolean {
  return obj !== null && typeof obj === 'object' && Object.keys(obj).length === 0;
}
