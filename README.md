# redux-miniprogram

[![build status](https://travis-ci.com/early-autumn/redux-miniprogram.svg?branch=master)](https://travis-ci.org/early-autumn/redux-miniprogram)
[![Coverage Status](https://coveralls.io/repos/github/early-autumn/redux-miniprogram/badge.svg?branch=master)](https://coveralls.io/github/early-autumn/redux-miniprogram?branch=master)
[![npm version](https://badge.fury.io/js/redux-miniprogram.svg)](https://badge.fury.io/js/redux-miniprogram)
[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT)

## 安装

```
yarn add redux-miniprogram
```

或者

```
npm i redux-miniprogram
```

## 简介

微信小程序版 redux 绑定工具，使用体验类似 react-redux。

* 支持 typescript

## 使用

1. 首先创建一个 store。

```typescript
// store/index.js
import { createStore } from 'redux';

const SAVE_COUNT = 'SAVE_COUNT';

export function saveCount(count) {
  return {
    type: SAVE_COUNT,
    payload: count
  }
}

const initState = { count: 0 };

function reducer(state = initState, action) {
  switch (action.type) {
    case SAVE_COUNT:
      return {
        ...state,
        count: action.payload,
      };
    default:
      return state;
  }
}

const store = createStore(reducer);

export default store;
```

2. 把 store 添加到 app 中。

```typescript
// app.js
import { Provider } from "redux-miniprogram";
import store from "./store/index";

App(
  Provider(store)({
    onLaunch: function() {
      console.log(this.store); // 传入的 store
    }
  })
);
```

3. 页面中使用。

```typescript
// ./pages/index/index.js
import { ConnectPage } from "redux-miniprogram";
import { saveCount } from '../../store/index';

Page(
  ConnectPage(state => {
    return {
      count: state.count
    };
  })({
    data: {},
    onLoad: function() {

      // 使用了和 vue 一样的批量更新 多次修改会合并成一次

      this.store.dispatch(saveCount(10));
      this.store.dispatch(saveCount(20));
      this.store.dispatch(saveCount(100));

      // 批量更新是异步的

      console.log(this.store.count); // 0

      setTimeout(() => {
        console.log(this.store.count); // 100
      }, 0)
    },
  })
);
```

3. 自定义组件中使用。

```typescript
// ./components/index/index.js
import { ConnectComponent } from "redux-miniprogram";
import { saveCount } from '../../store/index';

Component(
  ConnectComponent(state => {
    return {
      count: state.count
    };
  })({
    data: {},
    attached: function() {
      this.store.dispatch(saveCount(100));
      setTimeout(() => {
        console.log(this.store.count); // 100
      }, 0)
    },
  })
);
```

4. wxml 中使用。

```html
<view>{{store.count}}</view>
```

<!-- ## 目录

Provider, ConnectPage, ConnectComponent, useStore, useState, useDispatch  -->