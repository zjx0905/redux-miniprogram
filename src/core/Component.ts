/*
 * @Author: early-autumn
 * @Date: 2020-03-25 14:54:52
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-07 17:35:01
 */
import { AnyObject, MapStateToStore, MapDispatchToStore, ConnectComponentOptions } from '../types';
import connect from '../connect';

/**
 * Component 连接 Redux Store
 *
 * [查看文档](https://github.com/early-autumn/redux-miniprogram#connectcomponentmapstatetostore-mapdispatchtostoreoptions)
 */
export default function ConnectComponent<TStore extends AnyObject>(
  mapStateToStore?: MapStateToStore,
  mapDispatchToStore?: MapDispatchToStore
) {
  return function Connected<
    TData extends WechatMiniprogram.Component.DataOption,
    TProperty extends WechatMiniprogram.Component.PropertyOption,
    TMethod extends WechatMiniprogram.Component.MethodOption
  >(
    options: ConnectComponentOptions<TStore, TData, TProperty, TMethod>
  ): ConnectComponentOptions<TStore, TData, TProperty, TMethod> {
    return connect('component', mapStateToStore, mapDispatchToStore)(options);
  };
}
