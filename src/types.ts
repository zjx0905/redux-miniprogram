/*
 * @Author: early-autumn
 * @Date: 2020-03-28 17:41:06
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-06 15:19:12
 */
import 'miniprogram-api-typings';
import { Store, Dispatch } from 'redux';

export declare type ProviderOptions<ReduxStore extends Store, T extends AnyObject> = ThisType<{
  /**
   * 小程序唯一的 Redux Store
   *
   * https://redux.js.org/api/store
   */
  store: ReduxStore;
}> &
  WechatMiniprogram.App.Options<T>;

export declare type ConnectType = 'page' | 'component';

export declare type BaseOptions<
  ConnectStore extends AnyObject = AnyObject,
  Options extends AnyObject = AnyObject
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
  store: ConnectStore;
}> &
  Options;

export declare type ConnectPageOptions<
  ConnectStore extends AnyObject,
  DataOption extends WechatMiniprogram.Page.DataOption,
  CustomOption extends WechatMiniprogram.Page.CustomOption
> = BaseOptions<ConnectStore, WechatMiniprogram.Page.Options<DataOption, CustomOption>>;

export declare type ConnectComponentOptions<
  ConnectStore extends AnyObject,
  DataOption extends WechatMiniprogram.Component.DataOption,
  PropertyOption extends WechatMiniprogram.Component.PropertyOption,
  MethodOption extends WechatMiniprogram.Component.MethodOption
> = BaseOptions<
  ConnectStore,
  WechatMiniprogram.Component.Options<DataOption, PropertyOption, MethodOption>
>;

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
