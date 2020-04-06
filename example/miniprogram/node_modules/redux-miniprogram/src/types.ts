/*
 * @Author: early-autumn
 * @Date: 2020-03-28 17:41:06
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-06 23:12:36
 */
import 'miniprogram-api-typings';
import { Store, Dispatch } from 'redux';

export declare type AnyObject = Record<string, any>;

export declare type ProviderOptions<TStore extends Store, TObject extends AnyObject> = ThisType<
  {
    /**
     * 小程序中唯一的 Redux Store
     *
     * https://redux.js.org/api/store
     */
    store: TStore;
  } & WechatMiniprogram.App.Instance<TObject>
> &
  WechatMiniprogram.App.Options<TObject>;

export declare type ConnectType = 'page' | 'component';

export declare type ConnectPageOptions<
  TStore extends AnyObject,
  TData extends WechatMiniprogram.Page.DataOption,
  TCustom extends WechatMiniprogram.Page.CustomOption
> = ThisType<
  {
    /**
     * mapStateToStore() 和 mapDispatchToStore() 合并出的 ConnectStore
     *
     * 含有订阅的 state 以及 dispatch 函数
     *
     * https://github.com/early-autumn/redux-miniprogram#connectpagemapstatetostore-mapdispatchtostoreoptions
     */
    store: TStore;
  } & WechatMiniprogram.Page.Instance<TData, TCustom>
> &
  WechatMiniprogram.Page.Options<TData, TCustom>;

export declare type ConnectComponentOptions<
  TStore extends AnyObject,
  TData extends WechatMiniprogram.Component.DataOption,
  TProperty extends WechatMiniprogram.Component.PropertyOption,
  TMethod extends WechatMiniprogram.Component.MethodOption
> = ThisType<
  {
    /**
     * mapStateToStore() 和 mapDispatchToStore() 合并出的 ConnectStore
     *
     * 含有订阅的 state 以及 dispatch 函数
     *
     * https://github.com/early-autumn/redux-miniprogram#connectcomponentmapstatetostore-mapdispatchtostoreoptions
     */
    store: TStore;
  } & WechatMiniprogram.Component.Instance<TData, TProperty, TMethod>
> &
  WechatMiniprogram.Component.Options<TData, TProperty, TMethod>;

export interface Committing {
  state: boolean;
  commit: (handler: (end: () => void) => Promise<void> | void) => void;
  end: () => void;
}

export interface MapStateToStore {
  (state: any): AnyObject;
}

export interface MapDispatchToStore<T extends Dispatch = Dispatch> {
  (dispatch: T): AnyObject;
}
