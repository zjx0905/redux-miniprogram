/*
 * @Author: early-autumn
 * @Date: 2020-03-25 14:54:52
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-05 19:57:39
 */
import { MapStateToStore, MapDispatchToStore, ConnectPageOptions } from '../types';
import connect from '../connect';

/**
 *
 * @param mapStateToStore
 * @param mapDispatchToStore
 */
export default function ConnectPage<T extends AnyObject>(
  mapStateToStore?: MapStateToStore,
  mapDispatchToStore?: MapDispatchToStore
) {
  return function Connected<
    Y extends WechatMiniprogram.Page.DataOption,
    P extends WechatMiniprogram.Page.CustomOption
  >(options: ConnectPageOptions<T, Y, P>) {
    return connect('page', mapStateToStore, mapDispatchToStore)(options) as ConnectPageOptions<
      T,
      Y,
      P
    >;
  };
}
