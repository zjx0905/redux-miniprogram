import 'miniprogram-api-typings';
import { Store, Dispatch } from 'redux';

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
     * mapStateToProps() 和 mapDispatchToProps() 合并出的 Connect Store
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
     * mapStateToProps() 和 mapDispatchToProps() 合并出的 Connect Store
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

export interface MapStateToProps {
  (state: AnyObject): {
    state?: AnyObject;
    pureState?: AnyObject;
  };
}

export interface MapDispatchToProps<T extends Dispatch = Dispatch> {
  (dispatch: T): AnyObject;
}
