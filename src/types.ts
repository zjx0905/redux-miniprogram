/*
 * @Author: early-autumn
 * @Date: 2020-03-28 17:41:06
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-05 20:05:56
 */
import 'miniprogram-api-typings';
import { Store, Dispatch } from 'redux';

export declare type Options<
  T extends AnyObject = AnyObject,
  Y extends AnyObject = AnyObject
> = ThisType<{ store: T }> & Y;

export declare type ProviderOptions<T extends Store, Y extends AnyObject> = Options<
  T,
  WechatMiniprogram.App.Options<Y>
>;

export declare type ConnectType = 'page' | 'component';

export declare type ConnectPageOptions<
  T extends AnyObject,
  Y extends WechatMiniprogram.Page.DataOption,
  P extends WechatMiniprogram.Page.CustomOption
> = Options<T, WechatMiniprogram.Page.Options<Y, P>>;

export declare type ConnectComponentOptions<
  T extends AnyObject,
  Y extends WechatMiniprogram.Component.DataOption,
  P extends WechatMiniprogram.Component.PropertyOption,
  E extends WechatMiniprogram.Component.MethodOption
> = Options<T, WechatMiniprogram.Component.Options<Y, P, E>>;

export interface Committing {
  state: boolean;
  commit: (handler: (end: () => void) => Promise<void> | void) => void;
  end: () => void;
}
export interface MapStateToStore {
  <T extends AnyObject>(state: T): AnyObject;
}

export interface MapDispatchToStore {
  (state: Dispatch): AnyObject;
}
