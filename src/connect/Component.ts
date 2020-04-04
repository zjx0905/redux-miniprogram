/*
 * @Author: early-autumn
 * @Date: 2020-03-25 14:54:52
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-04 13:27:43
 */
import {
  MapStateToStore,
  MapDispatchToStore,
  ComponentOptions,
  ConnectComponentInstance,
  ConnectComponentOptions,
} from '../types';
import connect from './connect';

/**
 *
 * @param mapStateToStore
 * @param mapDispatchToStore
 */
export default function ConnectComponent<T extends AnyObject>(
  mapStateToStore?: MapStateToStore,
  mapDispatchToStore?: MapDispatchToStore
) {
  return function Connected<A extends ComponentOptions>(options: ConnectComponentInstance<T, A>) {
    return connect(
      'component',
      mapStateToStore,
      mapDispatchToStore
    )(options) as ConnectComponentOptions<T, A>;
  };
}
