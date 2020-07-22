import { AnyObject, MapStateToStore, MapDispatchToStore, ConnectPageOptions } from '../types';
import connect from '../connect';

/**
 * Page 连接 Redux Store
 *
 * @param mapStateToStore    订阅的 state
 * @param mapDispatchToStore 包装过的 dispatch
 *
 * @see[查看文档](https://github.com/early-autumn/redux-miniprogram#connectpagemapstatetostore-mapdispatchtostoreoptions)
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
