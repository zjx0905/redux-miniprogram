/*
 * @Author: early-autumn
 * @Date: 2020-03-25 14:54:52
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-04 13:26:52
 */
import {
  MapStateToStore,
  MapDispatchToStore,
  PageOptions,
  ConnectPageInstance,
  ConnectPageOptions,
} from '../types';
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
  return function Connected<A extends PageOptions>(options: ConnectPageInstance<T, A>) {
    return connect('page', mapStateToStore, mapDispatchToStore)(options) as ConnectPageOptions<
      T,
      A
    >;
  };
}
