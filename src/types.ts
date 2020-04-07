/*
 * @Author: early-autumn
 * @Date: 2020-03-28 17:41:06
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-07 21:37:54
 */
import 'miniprogram-api-typings';
import { Store, Dispatch } from 'redux';

export declare type AnyObject = Record<string, any>;

export declare type ProviderOptions<TStore extends Store, TAnyObject extends AnyObject> = ThisType<
  {
    /**
     * 小程序中唯一的 Redux Store
     *
     * [Redux Store](https://redux.js.org/api/store)
     */
    store: TStore;
  } & WechatMiniprogram.App.Instance<TAnyObject>
> &
  WechatMiniprogram.App.Options<TAnyObject>;

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
     * [查看文档](https://github.com/early-autumn/redux-miniprogram#%E5%8F%82%E6%95%B0-2)
     *
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
     * [查看文档](https://github.com/early-autumn/redux-miniprogram#%E5%8F%82%E6%95%B0-4)
     */
    store: TStore;
  } & WechatMiniprogram.Component.Instance<TData, TProperty, TMethod>
> &
  WechatMiniprogram.Component.Options<TData, TProperty, TMethod>;

export interface Committing {
  /**
   * 当前状态
   */
  state: boolean;
  /**
   * 提交中
   */
  commit: (handler: () => void) => void;
  /**
   * 提交结束
   */
  end: () => void;
}

export interface MapStateToStore {
  (state: any): AnyObject;
}

export interface MapDispatchToStore<T extends Dispatch = Dispatch> {
  (dispatch: T): AnyObject;
}
