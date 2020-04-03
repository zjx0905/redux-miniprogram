/*
 * @Author: early-autumn
 * @Date: 2020-03-29 18:40:24
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-03 19:56:08
 */
import { Dispatch } from 'redux';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const mapStateToStoreDefault = (_state: AnyObject): AnyObject => {
  return {};
};

export const mapDispatchToStoreDefault = (dispatch: Dispatch): AnyObject => {
  return { dispatch };
};
