/*
 * @Author: early-autumn
 * @Date: 2020-03-28 17:41:06
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-04 15:27:29
 */
import 'miniprogram-api-typings';
import { Store, Dispatch } from 'redux';

export declare type AppInstance = WechatMiniprogram.App.Instance<AnyObject>;

export declare type AppOptions = WechatMiniprogram.App.Options<AnyObject>;

export declare type PageInstance = WechatMiniprogram.Page.Instance<
  WechatMiniprogram.Page.DataOption,
  WechatMiniprogram.Page.CustomOption
>;

export declare type PageOptions = WechatMiniprogram.Page.Options<
  WechatMiniprogram.Page.DataOption,
  WechatMiniprogram.Page.CustomOption
>;

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

export declare type ProviderInstance<T extends Store, A extends AppOptions> = ThisType<
  { store: T & AppInstance } & A
>;

export declare type ProviderOptions<T extends Store, A extends AppOptions> = {
  store: T;
} & A;

export declare type ConnectInstance<
  T extends AnyObject = AnyObject,
  I extends AnyObject = AnyObject,
  O extends AnyObject = AnyObject
> = ThisType<{ store: T } & I> & {
  store: T;
  data: Record<string, any>;
} & O;

export declare type ConnectOptions<
  T extends AnyObject = AnyObject,
  A extends AnyObject = AnyObject
> = {
  store: T;
} & A;

export declare type ConnectType = 'page' | 'component';

export declare type ConnectPageInstance<
  T extends AnyObject,
  A extends PageOptions
> = ConnectInstance<T, A, PageInstance>;

export declare type ConnectPageOptions<T extends AnyObject, A extends PageOptions> = ConnectOptions<
  T,
  A
>;

export declare type ConnectComponentInstance<
  T extends AnyObject,
  A extends ComponentOptions
> = ConnectInstance<T, A, ComponentInstance>;

export declare type ConnectComponentOptions<
  T extends AnyObject,
  A extends ComponentOptions
> = ConnectOptions<T, A>;

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
