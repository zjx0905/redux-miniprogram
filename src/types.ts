/*
 * @Author: early-autumn
 * @Date: 2020-03-28 17:41:06
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-03-31 21:01:09
 */
import 'miniprogram-api-typings';
import { Store } from 'redux';

export declare type AppInstance = WechatMiniprogram.App.Instance<AnyObject>;

export declare type AppOptions = WechatMiniprogram.App.Options<AnyObject>;

export declare type ProviderInstance<T extends Store, A extends AppOptions> = ThisType<
  { store: T & AppInstance } & A
>;

export declare type ProviderOptions<T extends Store, A extends AppOptions> = {
  store: T;
} & A;

export declare type PageInstance = WechatMiniprogram.Page.Instance<
  WechatMiniprogram.Page.DataOption,
  WechatMiniprogram.Page.CustomOption
>;

export declare type PageOptions = WechatMiniprogram.Page.Options<
  WechatMiniprogram.Page.DataOption,
  WechatMiniprogram.Page.CustomOption
>;

export declare type ConnectPageInstance<T extends AnyObject, A extends PageOptions> = ThisType<
  { store: T } & PageInstance
> &
  A;

export declare type ConnectPageOptions<T extends AnyObject, A extends PageOptions> = {
  store: T;
} & A;

export declare type ComponentInstance = WechatMiniprogram.Component.Instance<
  WechatMiniprogram.Component.DataOption,
  WechatMiniprogram.Component.PropertyOption,
  WechatMiniprogram.Component.MethodOption
>;

export declare type ComponentOptions = WechatMiniprogram.Component.Options<
  WechatMiniprogram.Component.DataOption,
  WechatMiniprogram.Component.PropertyOption,
  WechatMiniprogram.Component.MethodOption
>;

export declare type ConnectComponentInstance<
  T extends AnyObject,
  A extends ComponentOptions
> = ThisType<{ store: T } & ComponentInstance> & A;

export declare type ConnectComponentOptions<T extends AnyObject, A extends ComponentOptions> = {
  store: T;
} & A;

export interface Committing {
  state: boolean;
  commit: (handler: (end?: () => void) => Promise<void> | void) => void;
  end: () => void;
}

export interface UpdaterOptions {
  getState: () => AnyObject;
  getNextState: (state: AnyObject) => AnyObject;
  setState: (updateState: AnyObject) => void;
}
