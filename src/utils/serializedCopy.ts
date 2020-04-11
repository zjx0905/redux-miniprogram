/*
 * @Author: early-autumn
 * @Date: 2020-04-11 09:56:15
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-11 10:48:55
 */
import { AnyObject } from '../types';

/**
 * JSON 系列化拷贝法
 *
 * @param obj 源对象
 */
export default function serializedCopy(obj: AnyObject): AnyObject {
  return JSON.parse(JSON.stringify(obj));
}
