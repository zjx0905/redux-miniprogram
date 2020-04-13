/*
 * @Author: early-autumn
 * @Date: 2020-04-11 09:56:15
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-13 12:49:32
 */
import { AnyObject } from '../types';

/**
 * JSON 系列化拷贝法
 *
 * @param obj 源对象
 */
export default function serializeCopy(obj: AnyObject): AnyObject {
  return JSON.parse(JSON.stringify(obj));
}
