import { AnyObject } from '../types';

/**
 * JSON 系列化拷贝法
 *
 * @param obj 源对象
 */
export default function serializeCopy(obj: AnyObject): AnyObject {
  return JSON.parse(JSON.stringify(obj));
}
