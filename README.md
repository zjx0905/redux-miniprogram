# redux-miniprogram

[![build status](https://travis-ci.com/early-autumn/redux-miniprogram.svg?branch=master)](https://travis-ci.org/early-autumn/redux-miniprogram)
[![Coverage Status](https://coveralls.io/repos/github/early-autumn/redux-miniprogram/badge.svg?branch=master)](https://coveralls.io/github/early-autumn/redux-miniprogram?branch=master)
[![npm version](https://badge.fury.io/js/redux-miniprogram.svg)](https://badge.fury.io/js/redux-miniprogram)
[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT)

## 安装

`
yarn add redux-miniprogram
`

或者

`
npm i redux-miniprogram
`

## 简介

微信小程序 redux 绑定工具，使用体验类似 react-redux。

* 支持 批量更新
* 支持 typescript

> 为了尽可能节省性能，使用 Promise 异步更新状态，使用 setTimeout 异步更新视图。

## 使用

1. 首先创建一个 `Redux Store`。

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

2. 使用 `Provider` 把 `Redux Store` 添加到 `App Options` 中。

```typescript
// app.js
import { Provider } from "redux-miniprogram";
import store from "./store";

App(
  Provider(store, {
    onLaunch: function() {
      console.log(this.store); // 可以获取到 Redux Store
    }
  })
);
```

3. `Page` 中使用 `ConnectPage` 连接 `Redux Store`。

```typescript
// pages/index/index.js
import { ConnectPage } from "redux-miniprogram";
import { saveCount } from '../../store';

function mapStateToStore(state) {
  return {
    count: state.count
  };
}

function mapDispatchToStore(dispatch) {
  return {
    saveCountDispatch(count) {
      dispatch(saveCount(count));
    }
  };
}

Page(
  ConnectPage(mapStateToStore, mapDispatchToStore)({
    data: {},
    onLoad: function() {
      // 使用了和 vue 一样的批量更新 多次修改会合并成一次
      this.store.dispatch(saveCount(10));
      this.store.dispatch(saveCount(20));
      this.store.saveCountDispatch(30);
      this.store.saveCountDispatch(100); 

      // 批量更新是异步的
      console.log(this.store.count); // 0

      setTimeout(() => {
        console.log(this.store.count); // 100
      }, 0)
    },
  })
);
```

3. `Component` 中使用 `ConnectComponent` 连接 `Redux Store`。

```typescript
// components/index/index.js
import { ConnectComponent } from "redux-miniprogram";
import { saveCount } from '../../store';

function mapStateToStore(state) {
  return {
    count: state.count
  };
}

Component(
  ConnectComponent(mapStateToStore)({
    data: {},
    attached: function() {
      ...
    },
  })
);
```

4. `wxml` 中使用 `store.xxx` 获取 `ConnectStore` 中的状态。

```html
<view>{{store.count}}</view>
```

## API

### `Provider(store, options)`

`Provider` 用来把 `Redux Store` 添加到 `App Options` 中，使 `ConnectPage()` 和 `ConnectComponent()` 能访问到 `Redux Store`。

#### 参数

1. `store` ([Redux Store](https://redux.js.org/api/store)) 小程序中唯一的 `Redux Store`

2. `options` ([App Options](https://developers.weixin.qq.com/miniprogram/dev/reference/api/App.html)) 注册小程序所需的参数

#### 返回值

`Object` ([App Options](https://developers.weixin.qq.com/miniprogram/dev/reference/api/App.html)) 一个新的注册小程序所需的参数

```typescript
// App Options
const options = {
  onLaunch: function() {
    ...
  }
}

// 把 Redux Store 和 App Options 传给 Provider
// 返回一个新的 App Options
const appOptions = Provider(store, options);

// 然后把新的 App Options 传入 App
App(appOptions);

// 以上可以直接简写成以下形式
App(
  Provider(store, {
    onLaunch: function() {
      ...
    }
  })
);
```

### `ConnectPage(mapStateToStore?, mapDispatchToStore?)`

`ConnectPage` 用来连接 `Page` 和 `Redux Store`，使用 `ConnectPage` 可以创建一个 `ConnectStore`，然后把 `ConnectStore` 添加到 `Page Options` 中。

#### 参数

`ConnectPage()` 接收两个参数，均为可选。

1. `mapStateToStore?: (state) => Object`

2. `mapDispatchToStore?: (dispatch) => Object`

> mapStateToStore() 和 mapDispatchToStore() 返回的 Object 会合并成一个 ConnectStore。

#### 返回值

`ConnectPage()` 返回一个 `Connected` 函数

`Connected: (options) => Object`

#### `mapStateToStore?: (state) => Object`

`mapStateToStore` 用来订阅 `Redux Store` 中的 `state`。

`mapStateToStore` 调用时以 `state` 作为参数，返回的 `Object` 就是订阅的状态。

> 如果 ConnectPage() 没有传入 mapStateToStore，则不会订阅任何状态。

```typescript
// 如果这是 Redux Store 中的状态
const state = {
  count: 0
}

// 这样订阅 count 状态
const mapStateToStore = (state) => {
  return {
    count: state.count
  }
}

// 这样订阅所有状态
const mapStateToStore = (state) => state;
```

#### `mapDispatchToStore?: (dispatch) => Object`

`mapDispatchToStore` 用来包装 `Redux Store` 中的 `dispatch`。

`mapDispatchToStore` 调用时以 `dispatch` 作为参数。

通常情况下，你会利用这个 `dispatch` 来创建内部调用了 `dispatch` 的新函数。

```typescript
const mapDispatchToStore = dispatch => {
  return {
    increment: () => dispatch({ type: 'INCREMENT' }),
    decrement: () => dispatch({ type: 'DECREMENT' }),
    reset: () => dispatch({ type: 'RESET' }),
    // 建议在这里手动添加上 dispatch
    dispatch,
  }
}
 ```

> mapDispatchToStore 的默认值为 (dispatch) => ({ dispatch })，所以 ConnectPage() 没有传入 mapDispatchToStore 的情况下 ConnectStore 中会默认存在一个 dispatch 函数。

#### `Connected: (options) => Object`

##### 参数

`options` ([Page Options](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html)) 注册小程序中的一个页面所需的参数

##### 返回值

`Object` ([Page Options](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html)) 一个新的注册小程序中的一个页面所需的参数

`Connected` 用来把 `ConnectStore` 添加到 `Page Options` 中，使 `wxml` 中 `store.xxx` 和 `javascript` 中 `this.store.xxx` 能获取到 `ConnectStore` 中的状态和 `dispatch` 函数。

```tsx
// Page Options
const options = {
  onLoad: function() {
    ...
  }
}

const mapStateToStore = state => ({
  count: state.count
});

const mapDispatchToStore = dispatch => ({
  increment: () => dispatch({ type: 'INCREMENT' }),
  dispatch,
});

// 把 mapStateToStore 和 mapDispatchToStore 传给 ConnectPage
// 返回 Connected 函数
const Connected = ConnectPage(mapStateToStore, mapDispatchToStore);

// 把 Page Options 传给 Connected
// 返回一个新的 Page Options
const pageOptions = Connected(options);

// 然后把新的 Page Options 传入 Page
Page(pageOptions);

// 以上可以直接简写成以下形式
Page(
  ConnectPage(mapStateToStore, mapDispatchToStore)({
    onLoad: function() {
      // this.store 获取到的就是 ConnectStore
      console.log(this.store.count);
      this.store.increment();
      this.store.dispatch({ type: 'INCREMENT' });
    }
  })
);

// wxml 中 store.count 获取的就是 ConnectStore 中的状态
<view>{{store.count}}</view>
 ```

 ### `ConnectComponent(mapStateToStore?, mapDispatchToStore?)`

`ConnectComponent` 用来连接 `Component` 和 `Redux Store`，使用 `ConnectComponent` 可以创建一个 `ConnectStore`，然后把 `ConnectStore` 添加到 `Component Options` 中。

#### 参数

`ConnectComponent()` 接收两个参数，均为可选。

1. `mapStateToStore?: (state) => Object`

2. `mapDispatchToStore?: (dispatch) => Object`

> mapStateToStore() 和 mapDispatchToStore() 返回的 Object 会合并成一个 ConnectStore。

#### 返回值

`ConnectComponent()` 返回一个 `Connected` 函数

`Connected: (options) => Object`

#### `mapStateToStore?: (state) => Object`

`mapStateToStore` 用来订阅 `Redux Store` 中的 `state`。

`mapStateToStore` 调用时以 `state` 作为参数，返回的 `Object` 就是订阅的状态。

> 如果 ConnectComponent() 没有传入 mapStateToStore，则不会订阅任何状态。

```typescript
// 如果这是 Redux Store 中的状态
const state = {
  count: 0
}

// 这样订阅 count 状态
const mapStateToStore = (state) => {
  return {
    count: state.count
  }
}

// 这样订阅所有状态
const mapStateToStore = (state) => state;
```

#### `mapDispatchToStore?: (dispatch) => Object`

`mapDispatchToStore` 用来包装 `Redux Store` 中的 `dispatch`。

`mapDispatchToStore` 调用时以 `dispatch` 作为参数。

通常情况下，你会利用这个 `dispatch` 来创建内部调用了 `dispatch` 的新函数。

```typescript
const mapDispatchToStore = dispatch => {
  return {
    increment: () => dispatch({ type: 'INCREMENT' }),
    decrement: () => dispatch({ type: 'DECREMENT' }),
    reset: () => dispatch({ type: 'RESET' }),
    // 建议在这里手动添加上 dispatch
    dispatch,
  }
}
 ```

> mapDispatchToStore 的默认值为 (dispatch) => ({ dispatch })，所以 ConnectComponent() 没有传入 mapDispatchToStore 的情况下 ConnectStore 中会默认存在一个 dispatch 函数。

#### `Connected: (options) => Object`

##### 参数

`options` ([Component Options](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Component.html)) 注册小程序中的一个页面所需的参数

##### 返回值

`Object` ([Component Options](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Component.html)) 一个新的注册小程序中的一个页面所需的参数

`Connected` 用来把 `ConnectStore` 添加到 `Component Options` 中，使 `wxml` 中 `store.xxx` 和 `javascript` 中 `this.store.xxx` 能获取到 `ConnectStore` 中的状态和 `dispatch` 函数。

```tsx
// Component Options
const options = {
  onLoad: function() {
    ...
  }
}

const mapStateToStore = state => ({
  count: state.count
});

const mapDispatchToStore = dispatch => ({
  increment: () => dispatch({ type: 'INCREMENT' }),
  dispatch,
});

// 把 mapStateToStore 和 mapDispatchToStore 传给 ConnectComponent
// 返回 Connected 函数
const Connected = ConnectComponent(mapStateToStore, mapDispatchToStore);

// 把 Component Options 传给 Connected
// 返回一个新的 Component Options
const componentOptions = Connected(options);

// 然后把新的 Component Options 传入 Component
Component(componentOptions);

// 以上可以直接简写成以下形式
Component(
  ConnectComponent(mapStateToStore, mapDispatchToStore)({
    attached: function() {
      // this.store 获取到的就是 ConnectStore
      console.log(this.store.count);
      this.store.increment();
      this.store.dispatch({ type: 'INCREMENT' });
    }
  })
);

// wxml 中 store.count 获取的就是 ConnectStore 中的状态
<view>{{store.count}}</view>
 ```

### `useStore()`

获取小程序中唯一的 `Redux Store`

```typescript
import { useStore } from "redux-miniprogram";

const store = useStore();
```

### `useState()`

获取 `Redux Store` 中的状态

```typescript
import { useState } from "redux-miniprogram";

const state = useState();
```

### `useDispatch()`

获取 `Redux Store` 中的 dispatch 函数

```typescript
import { useDispatch } from "redux-miniprogram";

const dispatch = useDispatch();
```