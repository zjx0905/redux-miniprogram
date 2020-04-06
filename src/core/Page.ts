/*
 * @Author: early-autumn
 * @Date: 2020-03-25 14:54:52
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-06 21:54:24
 */
import { AnyObject, MapStateToStore, MapDispatchToStore, ConnectPageOptions } from '../types';
import connect from '../connect';

/**
 * @param mapStateToStore 订阅 state
 * @param mapDispatchToStore 包装 dispatch
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
