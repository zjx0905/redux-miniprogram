/*
 * @Author: early-autumn
 * @Date: 2020-03-25 18:01:06
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-07 19:53:12
 */
import Provider from './api/Provider';
import ConnectPage from './api/Page';
import ConnectComponent from './api/Component';

export {
  ProviderOptions,
  ConnectPageOptions,
  ConnectComponentOptions,
  MapStateToStore,
  MapPureDataToStore,
} from './types';

export { useStore, useState, useDispatch } from './api/hooks';

export { Provider, ConnectPage, ConnectComponent };
