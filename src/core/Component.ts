/*
 * @Author: early-autumn
 * @Date: 2020-03-25 14:54:52
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-06 15:00:56
 */
import { MapStateToStore, MapDispatchToStore, ConnectComponentOptions } from '../types';
import connect from '../connect';

/**
 *
 * @param mapStateToStore
 * @param mapDispatchToStore
 */
export default function ConnectComponent<ConnectStore extends AnyObject>(
  mapStateToStore?: MapStateToStore,
  mapDispatchToStore?: MapDispatchToStore
) {
  return function Connected<
    DataOption extends WechatMiniprogram.Component.DataOption,
    PropertyOption extends WechatMiniprogram.Component.PropertyOption,
    MethodOption extends WechatMiniprogram.Component.MethodOption
  >(options: ConnectComponentOptions<ConnectStore, DataOption, PropertyOption, MethodOption>) {
    return connect(
      'component',
      mapStateToStore,
      mapDispatchToStore
    )(options) as ConnectComponentOptions<ConnectStore, DataOption, PropertyOption, MethodOption>;
  };
}
