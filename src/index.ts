/*
 * @Author: early-autumn
 * @Date: 2020-03-25 18:01:06
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-13 16:20:01
 */
import Provider from './api/Provider';
import ConnectPage from './api/Page';
import ConnectComponent from './api/Component';
import { useStore, useState, useDispatch } from './api/hooks';

export {
  ProviderOptions,
  ConnectPageOptions,
  ConnectComponentOptions,
  MapStateToStore,
  MapDispatchToStore,
} from './types';

export { Provider, ConnectPage, ConnectComponent, useStore, useState, useDispatch };
