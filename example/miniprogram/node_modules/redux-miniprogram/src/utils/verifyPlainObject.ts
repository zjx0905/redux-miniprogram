/*
 * @Author: early-autumn
 * @Date: 2020-04-04 19:38:10
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-04 19:48:25
 */
import isPlainObject from './isPlainObject';
import assert from './assert';

/**
 * 检查一个对象是否是一个普通对象
 *
 * 如果不是一个普通对象就抛出异常
 *
 * @param name 要检查的对象的名称
 * @param obj 要检查的对象
 */
export default function verifyPlainObject(name: string, obj: any) {
  assert(!isPlainObject(obj), `${name} 必须返回一个普通的对象 而不是 ${obj}`);
}
