/*
 * @Author: early-autumn
 * @Date: 2020-03-25 14:54:52
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-06 15:21:55
 */
import { MapStateToStore, MapDispatchToStore, ConnectPageOptions } from '../types';
import connect from '../connect';

/**
 * @param mapStateToStore 订阅 state
 * @param mapDispatchToStore 包装 dispatch
 */
export default function ConnectPage<ConnectStore extends AnyObject>(
  mapStateToStore?: MapStateToStore,
  mapDispatchToStore?: MapDispatchToStore
) {
  return function Connected<
    DataOption extends WechatMiniprogram.Page.DataOption,
    CustomOption extends WechatMiniprogram.Page.CustomOption
  >(options: ConnectPageOptions<ConnectStore, DataOption, CustomOption>) {
    return connect('page', mapStateToStore, mapDispatchToStore)(options) as ConnectPageOptions<
      ConnectStore,
      DataOption,
      CustomOption
    >;
  };
}
