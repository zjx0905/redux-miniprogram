import { MapStateToProps, MapDispatchToProps, ConnectComponentOptions } from '../types';
import connect from '../connect';

/**
 * Component 连接 Redux Store
 *
 * @param mapStateToProps    订阅的 state
 * @param mapDispatchToProps 包装过的 dispatch
 *
 * @see[查看文档](https://github.com/early-autumn/redux-miniprogram#connectcomponentmapstatetostore-mapdispatchtostoreoptions)
 */
export default function ConnectComponent<TStore extends AnyObject>(
  mapStateToProps?: MapStateToProps,
  mapDispatchToProps?: MapDispatchToProps
) {
  return function Connected<
    TData extends WechatMiniprogram.Component.DataOption,
    TProperty extends WechatMiniprogram.Component.PropertyOption,
    TMethod extends WechatMiniprogram.Component.MethodOption
  >(
    options: ConnectComponentOptions<TStore, TData, TProperty, TMethod>
  ): ConnectComponentOptions<TStore, TData, TProperty, TMethod> {
    return connect('component', mapStateToProps, mapDispatchToProps)(options);
  };
}
