import isPlainObject from './isPlainObject';
import assert from './assert';

export default function verifyPlainObject(name: string, obj: unknown): void {
  assert(isPlainObject(obj), `${name} 必须返回一个普通的对象 而不是 ${obj}`);
}
