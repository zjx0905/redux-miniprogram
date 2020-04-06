/*
 * @Author: early-autumn
 * @Date: 2020-03-25 18:01:06
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-06 21:52:15
 */
import Provider from './core/Provider';
import ConnectPage from './core/Page';
import ConnectComponent from './core/Component';

export {
  ProviderOptions,
  ConnectPageOptions,
  ConnectComponentOptions,
  MapStateToStore,
  MapDispatchToStore,
} from './types';

export { useStore, useState, useDispatch } from './hooks';

export { Provider, ConnectPage, ConnectComponent };
