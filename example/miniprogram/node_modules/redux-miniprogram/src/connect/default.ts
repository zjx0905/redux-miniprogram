/*
 * @Author: early-autumn
 * @Date: 2020-03-29 18:40:24
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-04 13:58:20
 */
import { MapStateToStore, MapDispatchToStore } from '../types';

export const mapStateToStoreDefault: MapStateToStore = () => ({});

export const mapDispatchToStoreDefault: MapDispatchToStore = (dispatch) => ({ dispatch });
