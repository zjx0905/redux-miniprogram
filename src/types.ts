/*
 * @Author: early-autumn
 * @Date: 2020-03-28 17:41:06
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-09 16:20:14
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

export interface Commit {
  /**
   * 同步还是异步
   */
  task: 'sync' | 'async';
  /**
   * 当前状态
   */
  state: boolean;
  /**
   * 获取当前状态
   */
  getState: () => boolean;
  /**
   * 设置当前状态
   */
  setState: (state: boolean) => void;
  /**
   * 运行
   */
  run: (handler: () => void) => void;
}

export interface MapStateToStore {
  (state: any): AnyObject;
}

export interface MapDispatchToStore<T extends Dispatch = Dispatch> {
  (dispatch: T): AnyObject;
}
