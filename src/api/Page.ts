/*
 * @Author: early-autumn
 * @Date: 2020-03-25 14:54:52
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-07 21:08:54
 */
import { AnyObject, MapStateToStore, MapDispatchToStore, ConnectPageOptions } from '../types';
import connect from '../connect';

/**
 * Page 连接 Redux Store
 *
 * @param mapStateToStore 订阅 state 的函数
 * @param mapDispatchToStore 包装 dispatch 的函数
 *
 * @ [查看文档](https://github.com/early-autumn/redux-miniprogram#connectpagemapstatetostore-mapdispatchtostoreoptions)
 */
export default function ConnectPage<TStore extends AnyObject>(
  mapStateToStore?: MapStateToStore,
  mapDispatchToStore?: MapDispatchToStore
) {
  return function Connected<
    TData extends WechatMiniprogram.Page.DataOption,
    TCustom extends WechatMiniprogram.Page.CustomOption
  >(
    options: ConnectPageOptions<TStore, TData, TCustom>
  ): ConnectPageOptions<TStore, TData, TCustom> {
    return connect('page', mapStateToStore, mapDispatchToStore)(options) as ConnectPageOptions<
      TStore,
      TData,
      TCustom
    >;
  };
}
