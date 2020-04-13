/*
 * @Author: early-autumn
 * @Date: 2020-03-25 18:01:06
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-13 11:25:50
 */
import Provider from './api/Provider';
import ConnectPage from './api/Page';
import ConnectComponent from './api/Component';

export {
  ProviderOptions,
  ConnectPageOptions,
  ConnectComponentOptions,
  MapStateToStore,
  MapDispatchToStore,
} from './types';

export { useStore, useState, useDispatch } from './api/hooks';

export { Provider, ConnectPage, ConnectComponent };
