/*
 * @Author: early-autumn
 * @Date: 2020-03-28 17:41:06
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-05 23:04:55
 */
import 'miniprogram-api-typings';
import { Store, Dispatch } from 'redux';

export declare type ProviderOptions<T extends Store, Y extends AnyObject> = ThisType<{
  /**
   * 小程序唯一的 Redux Store
   *
   * https://redux.js.org/api/store
   */
  store: T;
}> &
  WechatMiniprogram.App.Options<Y>;

export declare type ConnectType = 'page' | 'component';

export declare type Options<
  T extends AnyObject = AnyObject,
  Y extends AnyObject = AnyObject
> = ThisType<{
  /**
   * mapStateToStore() 和 mapDispatchToStore() 合并出的 ConnectStore
   *
   * 含有订阅的 state 以及 dispatch 函数
   *
   * Page: https://github.com/early-autumn/redux-miniprogram#connectpagemapstatetostore-mapdispatchtostore
   *
   * Component: https://github.com/early-autumn/redux-miniprogram#connectcomponentmapstatetostore-mapdispatchtostore
   */
  store: T;
}> &
  Y;

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
