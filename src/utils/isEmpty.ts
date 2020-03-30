/*
 * @Author: early-autumn
 * @Date: 2020-03-30 18:43:10
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-03-30 19:29:57
 */
export default function isEmpty(value: any): boolean {
  return (
    value === null ||
    value === undefined ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    value === 0 ||
    value === ''
  );
}
