/**
 * 是一个普通对象吗?
 *
 * @param obj 要检查的对象
 */
export default function isPlainObject(obj: any): boolean {
  if (typeof obj !== 'object' || obj === null) return false;

  const proto = Object.getPrototypeOf(obj);
  if (proto === null) return true;

  let baseProto = proto;
  while (Object.getPrototypeOf(baseProto) !== null) {
    baseProto = Object.getPrototypeOf(baseProto);
  }

  return proto === baseProto;
}
