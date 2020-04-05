/*
 * @Author: early-autumn
 * @Date: 2020-03-25 14:54:52
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-05 19:56:47
 */
import { MapStateToStore, MapDispatchToStore, ConnectComponentOptions } from '../types';
import connect from '../connect';

/**
 *
 * @param mapStateToStore
 * @param mapDispatchToStore
 */
export default function ConnectComponent<T extends AnyObject>(
  mapStateToStore?: MapStateToStore,
  mapDispatchToStore?: MapDispatchToStore
) {
  return function Connected<
    Y extends WechatMiniprogram.Component.DataOption,
    P extends WechatMiniprogram.Component.PropertyOption,
    E extends WechatMiniprogram.Component.MethodOption
  >(options: ConnectComponentOptions<T, Y, P, E>) {
    return connect(
      'component',
      mapStateToStore,
      mapDispatchToStore
    )(options) as ConnectComponentOptions<T, Y, P, E>;
  };
}
