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

> 批量更新是异步的。

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
  Provider(store)({
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

const mapStateToStore = (state) => ({
  state: {
    count: state.count
  }
});

const mapDispatchToStore = (dispatch) =>({
  saveCount(count) {
    dispatch(saveCount(count));
  },
  dispatch
})

Page(
  ConnectPage(mapStateToStore, mapDispatchToStore)({ 
    onLoad: function() {
      // 使用了和 vue 一样的批量更新 多次修改会合并成一次
      this.store.dispatch(saveCount(10));
      this.store.dispatch(saveCount(20));
      this.store.saveCount(30);
      this.store.saveCount(100); 

      // 批量更新是异步的
      console.log(this.store.count); // 0

      setTimeout(() => {
        console.log(this.store.count); // 100
      }, 0)
    },
  })
);
```

4. `Component` 中使用 `ConnectComponent` 连接 `Redux Store`。

```typescript
// components/index/index.js
import { ConnectComponent } from "redux-miniprogram";
import { saveCount } from '../../store';

const mapStateToStore = (state) => ({
  state: {
    count: state.count
  }
});

Component(
  ConnectComponent(mapStateToStore)({ 
    attached: function() {
      ...
    },
  })
);
```

5. `wxml` 中使用 `store.xxx` 获取 `Connect Store` 中的状态。

```html
<view>{{store.count}}</view>
```

[typescript 示例项目](https://github.com/early-autumn/redux-miniprogram-example)

## 注意

因为 [diff](https://github.com/early-autumn/redux-miniprogram/blob/master/src/utils/diff.ts) 算法中判断相等的方式和 [Object.is()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is) 的表现一致, 所以修改状态必须返回[不可变数据](https://zh-hans.reactjs.org/docs/optimizing-performance.html#the-power-of-not-mutating-data), 否则不会触发更新

不使用不可变数据会发生什么?

```typescript
const a = { v: 1 };
const b = a;
a.v = 100;
a === b // true

const c = [];
const d = c;
c.push(100);
c === d // true
```

使用不可变数据后

```typescript
const a = { v: 1 };
const b = {...a};
a.v = 100;
a === b // false

const c = [];
const d = [...c];
c.push(100);
c === d // false
```

如何操作不可变数据?

`Object` 操作不可变数据举例

```typescript
{...}
Object.assign()
```

`Array` 操作不可变数据举例

```typescript
[...]
[].concat()
[].map()
[].filter()
```

下面列举了部分利用不可变数据修改状态的方法

```typescript
const initState = {
  a: {
    v:1
  },
  b: [1]
}

function reducer(state = initState, action) {
  switch(action.type){
    case '对象 a 修改属性 v 的值': {
      const newA = {
        ...state.a
        v: action.payload
      };

      return {
        ...state,
        a: newA
      }
    }
    case '对象 a 新增属性 v2': {
      const newA = {
        ...state.a
        v2: action.payload
      };

      return {
        ...state,
        a: newA
      }
    }
    case '对象 a 删除属性 v2': {
      const newA = {...state.a};

      delete newA.v2;

      return {
        ...state,
        a: newA
      }
    }
    case '数组 b 修改指定下标的值': {

      return {
        ...state,
        b: state.b.map((item, index) => {
          return index === action.index ? action.payload : item;
        })
      }
    }
    case '数组 b 添加新值': {

      return {
        ...state,
        b: [...state.b, action.payload]
      }
    }
    case '数组 b 删除指定下标的值': {

      return {
        ...state,
        b: state.b.filter((item, index) => index !== action.index)
      }
    }
    default:

      return {...state}
  }
}
```

## API

### `Provider(store)(options)`

`Provider` 用来把 `Redux Store` 添加到 `App Options` 中，使 `ConnectPage()` 和 `ConnectComponent()` 能访问到 `Redux Store`。

#### 参数

`store` ([Redux Store](https://redux.js.org/api/store)) 小程序中唯一的 `Redux Store`

#### 返回值

`Provider()` 返回一个 `Provided` 函数

`Provided: (options) => Object`

#### `Provided: (options) => Object`

##### 参数

`options` ([App Options](https://developers.weixin.qq.com/miniprogram/dev/reference/api/App.html)) 注册小程序所需的参数

##### 返回值

`Object` ([App Options](https://developers.weixin.qq.com/miniprogram/dev/reference/api/App.html)) 一个新的注册小程序所需的参数

```typescript
// App Options
const options = {
  onLaunch: function() {
    ...
  }
}

// 把 Redux Store 传给 Provider
// 返回 Provided 函数
const Provided = Provider(store);

// 把 App Options 传给 Provided
// 返回一个新的 App Options
const appOptions = Provided(options);

// 然后把新的 App Options 传入 App
App(appOptions);

// 以上可以直接简写成以下形式
App(
  Provider(store)({
    onLaunch: function() {
      ...
    }
  })
);
```

### `ConnectPage(mapStateToStore?, mapDispatchToStore?)(options)`

`ConnectPage` 用来连接 `Page` 和 `Redux Store`，使用 `ConnectPage` 可以创建一个 `Connect Store`，然后把 `Connect Store` 添加到 `Page Options` 中。

#### 参数

`ConnectPage()` 接收两个参数，均为可选。

1. `mapStateToStore?: (state) => ({ state?: Object, pureState?: Object })`

2. `mapDispatchToStore?: (dispatch) => Object`

> 最终 mapStateToStore() 返回的 state 和 pureState 和 mapDispatchToStore() 返回的 Object 会合并成一个 Connect Store

#### 返回值

`ConnectComponent()` 返回一个 `Connected` 函数

`Connected: (options) => Object`

#### `mapStateToStore?: (state) => ({ state?: Object, pureState?: Object })`

`mapStateToStore` 用来订阅 `Redux Store` 中的 `state` 

`mapStateToStore` 调用时以 `state` 作为参数，返回的 `{ state?: Object, pureState?: Object }` 就是订阅的状态, `state` 是订阅的会参与渲染的 `state`, `pureState` 是订阅的不会会参与渲染的 `state`

> 如果 ConnectPage() 没有传入 mapStateToStore，则不会订阅任何状态。

```typescript
// 如果这是 Redux Store 中的状态
const state = {
  count: 0,
  name: 'test'
}

// 订阅 state 分两种
const mapStateToStore = (state) => ({
  // 普通 state, 会参与渲染
  state: {
    count: state.count
  },
  // 纯 state, 不会参会与渲染
  pureState:{
    name: state.name
  }
})

// 这样订阅所有状态
const mapStateToStore = (state) => state;
```

#### `mapDispatchToStore?: (dispatch) => Object`

`mapDispatchToStore` 用来包装 `Redux Store` 中的 `dispatch` 

`mapDispatchToStore` 调用时以 `dispatch` 作为参数 

通常情况下，你会利用这个 `dispatch` 来创建内部调用了 `dispatch` 的新函数  

```typescript
const mapDispatchToStore = (dispatch) => {
  return {
    increment: () => dispatch({ type: 'INCREMENT' }),
    decrement: () => dispatch({ type: 'DECREMENT' }), 
    // 建议在这里手动添加上 dispatch
    dispatch,
  }
}
 ```

> mapDispatchToStore 的默认值为 (dispatch) => ({ dispatch })，所以 ConnectPage() 没有传入 mapDispatchToStore 的情况下 Connect Store 中会默认存在一个 dispatch 函数。

#### `Connected: (options) => Object`

##### 参数

`options` ([Page Options](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html)) 注册小程序中的一个页面所需的参数

##### 返回值

`Object` ([Page Options](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html)) 一个新的注册小程序中的一个页面所需的参数

`Connected` 用来把 `Connect Store` 添加到 `Page Options` 中，使 `wxml` 中 `store.xxx` 和 `javascript` 中 `this.store.xxx` 能获取到 `Connect Store` 中的状态和 `dispatch` 函数。

```tsx
// Page Options
const options = {
  onLoad: function() {
    ...
  }
}

const mapStateToStore = state => ({
  state: {
    count: state.count
  }
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
      // this.store 获取到的就是 Connect Store
      console.log(this.store.count);
      this.store.increment();
      this.store.dispatch({ type: 'INCREMENT' });
    }
  })
);

// wxml 中 store.count 获取的就是 Connect Store 中的状态
<view>{{store.count}}</view>
 ```

 ### `ConnectComponent(mapStateToStore?, mapDispatchToStore?)(options)`

`ConnectComponent` 用来连接 `Component` 和 `Redux Store`，使用 `ConnectComponent` 可以创建一个 `Connect Store`，然后把 `Connect Store` 添加到 `Component Options` 中。

#### 参数

`ConnectComponent()` 接收两个参数，均为可选。

1. `mapStateToStore?: (state) => ({ state?: Object, pureState?: Object })`

2. `mapDispatchToStore?: (dispatch) => Object`

> 最终 mapStateToStore() 返回的 state 和 pureState 和 mapDispatchToStore() 返回的 Object 会合并成一个 Connect Store

#### 返回值

`ConnectComponent()` 返回一个 `Connected` 函数

`Connected: (options) => Object`

#### `mapStateToStore?: (state) => ({ state?: Object, pureState?: Object })`

`mapStateToStore` 用来订阅 `Redux Store` 中的 `state` 

`mapStateToStore` 调用时以 `state` 作为参数，返回的 `{ state?: Object, pureState?: Object }` 就是订阅的状态, `state` 是订阅的会参与渲染的 `state`, `pureState` 是订阅的不会会参与渲染的 `state` 

> 如果 ConnectComponent() 没有传入 mapStateToStore，则不会订阅任何状态。

```typescript
// 如果这是 Redux Store 中的状态
const state = {
  count: 0,
  name: 'test'
}

// 订阅 state 分两种
const mapStateToStore = (state) => ({
  // 普通 state, 会参与渲染
  state: {
    count: state.count
  },
  // 纯 state, 不会参会与渲染
  pureState:{
    name: state.name
  }
})

// 这样订阅所有状态
const mapStateToStore = (state) => state;
```

#### `mapDispatchToStore?: (dispatch) => Object`

`mapDispatchToStore` 用来包装 `Redux Store` 中的 `dispatch` 

`mapDispatchToStore` 调用时以 `dispatch` 作为参数 

通常情况下，你会利用这个 `dispatch` 来创建内部调用了 `dispatch` 的新函数 

```typescript
const mapDispatchToStore = (dispatch) => {
  return {
    increment: () => dispatch({ type: 'INCREMENT' }),
    decrement: () => dispatch({ type: 'DECREMENT' }), 
    // 建议在这里手动添加上 dispatch
    dispatch,
  }
}
 ```

> mapDispatchToStore 的默认值为 (dispatch) => ({ dispatch })，所以 ConnectComponent() 没有传入 mapDispatchToStore 的情况下 Connect Store 中会默认存在一个 dispatch 函数。

#### `Connected: (options) => Object`

##### 参数

`options` ([Component Options](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Component.html)) 注册小程序中的一个页面所需的参数

##### 返回值

`Object` ([Component Options](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Component.html)) 一个新的注册小程序中的一个页面所需的参数

`Connected` 用来把 `Connect Store` 添加到 `Component Options` 中，使 `wxml` 中 `store.xxx` 和 `javascript` 中 `this.store.xxx` 能获取到 `Connect Store` 中的状态和 `dispatch` 函数。

```tsx
// Component Options
const options = {
  onLoad: function() {
    ...
  }
}

const mapStateToStore = state => ({
  state: {
    count: state.count
  }
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
      // this.store 获取到的就是 Connect Store
      console.log(this.store.count);
      this.store.increment();
      this.store.dispatch({ type: 'INCREMENT' });
    }
  })
);

// wxml 中 store.count 获取的就是 Connect Store 中的状态
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

## 优化

`mapStateToStore` 订阅的 `state` 会参与渲染, 所以当 `mapStateToStore` 订阅的 `state` 发生改变时, 会触发小程序的 [setData](https://developers.weixin.qq.com/miniprogram/dev/framework/performance/tips.html) 接口更新视图, 而 setData 的性能开销是十分昂贵的

可能有时候我们需要订阅某些 `state`, 但是这些 `state` 又不会参与渲染, 这种情况下 `state` 发生了改变导致的 `setData` 很明显是多余的, 带来的是完全不必要的性能开销

所以不参与渲染的 `state` 尽量使用 `pureState` 订阅, 不然容易就会出现性能瓶颈

```typescript
const state = {
  name: '张三',
  age: 20
}

const mapStateToStore = (state) => ({
  // 状态发生改变 先 diff 再触发 setData 更新视图
  state: {
    name: state.name
  },
  // 状态发生改变, 只简单的同步当前状态, 不会 diff, 也不会触发 setData
  pureState: {
    age: state.age
  }
})
```

