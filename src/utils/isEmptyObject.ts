/**
 * 是一个空的对象吗?
 *
 * @param obj 要检查的对象
 */
export default function isEmptyObject(obj: any): boolean {
  return obj !== null && typeof obj === 'object' && Object.keys(obj).length === 0;
}
