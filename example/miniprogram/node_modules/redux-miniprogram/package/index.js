'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

/**
 *
 * @param store Redux Store
 * @param options App Options
 */
function Provider(store) {
  return function Provided(options) {
    return _extends({}, options, {
      store: store
    });
  };
}

/*
 * @Author: early-autumn
 * @Date: 2020-04-04 19:14:44
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-04 19:15:05
 */

/**
 * 如果出错，则抛出异常。
 * @param error 是否出错
 * @param message 错误信息
 */
function assert(error, message) {
  if (error) {
    throw new Error("[redux-miniprogram]\n    " + message);
  }
}

var store;
/**
 * 获取 Redux Store
 */

function useStore() {
  if (store === undefined) {
    store = getApp().store;
    assert(store === undefined, "\u6CA1\u6709\u627E\u5230 Redux Store\n      \u53EF\u80FD app.js \u4E2D Provider \u6B64\u65F6\u8FD8\u6CA1\u6709\u6267\u884C \u6216\u8005 \u5DF2\u7ECF\u6267\u884C\u4F46\u6CA1\u6709\u5C06 Redux Store \u4F5C\u4E3A\u53C2\u6570\u4F20\u5165");
  }

  return store;
}
/**
 * 获取 Redux Store 中的 state
 */

function useState() {
  if (store === undefined) {
    useStore();
  }

  return store.getState();
}
/**
 * 获取 Redux Store 中的 dispatch 函数
 */

function useDispatch() {
  if (store === undefined) {
    useStore();
  }

  return store.dispatch;
}

function createCommitting() {
  var committing = {
    state: false,
    commit: function commit(handler) {
      committing.state = true;
      handler(committing.end);
    },
    end: function end() {
      committing.state = false;
    }
  };
  return committing;
}

var committing = createCommitting();
var listeners = [];
var subscribed = false;

function updating() {
  if (committing.state === true) {
    return;
  }

  committing.commit(function (end) {
    Promise.resolve().then(function () {
      var state = useState();
      listeners.forEach(function (listener) {
        return listener(state);
      });
      end();
    });
  });
}

function subscribe(listener) {
  listeners.push(listener);

  if (subscribed === false) {
    subscribed = true;
    var store = useStore();
    store.subscribe(updating);
  }

  return function unsubscribe() {
    var index = listeners.indexOf(listener);
    listeners.splice(index, 1);
  };
}

var batchUpdate = {
  subscribe: subscribe
};

/*
 * @Author: early-autumn
 * @Date: 2020-04-04 19:16:07
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-04 19:20:01
 */

/**
 * 是一个普通的对象吗?
 *
 * @param obj 要检查的对象
 */
function isPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) return false;
  var proto = Object.getPrototypeOf(obj);
  if (proto === null) return true;
  var baseProto = proto;

  while (Object.getPrototypeOf(baseProto) !== null) {
    baseProto = Object.getPrototypeOf(baseProto);
  }

  return proto === baseProto;
}

/*
 * @Author: early-autumn
 * @Date: 2020-04-04 19:38:10
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-04 19:48:25
 */
/**
 * 检查一个对象是否是一个普通对象
 *
 * 如果不是一个普通对象就抛出异常
 *
 * @param name 要检查的对象的名称
 * @param obj 要检查的对象
 */

function verifyPlainObject(name, obj) {
  assert(!isPlainObject(obj), name + " \u5FC5\u987B\u8FD4\u56DE\u4E00\u4E2A\u666E\u901A\u7684\u5BF9\u8C61 \u800C\u4E0D\u662F " + obj);
}

/*
 * @Author: early-autumn
 * @Date: 2020-03-30 19:21:29
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-03-30 19:21:48
 */
function is(x, y) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}

function shallowEqual(objA, objB) {
  if (is(objA, objB)) return true;

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) return false;

  for (var i = 0; i < keysA.length; i++) {
    if (!Object.prototype.hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

function diff(objA, objB) {
  var obj = {};
  Object.keys(objB).forEach(function (key) {
    var valueA = objA[key];
    var valueB = objB[key];

    if (shallowEqual(valueA, valueB)) {
      return;
    }

    obj["store." + key] = valueB;
  });
  return obj;
}

/*
 * @Author: early-autumn
 * @Date: 2020-04-04 19:13:32
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-06 21:53:20
 */

/**
 * 是一个空的对象吗?
 *
 * @param obj 要检查的对象
 */
function isEmptyObject(obj) {
  return obj !== null && typeof obj === 'object' && Object.keys(obj).length === 0;
}

var mapStateToStoreDefault = function mapStateToStoreDefault() {
  return {};
};
var mapDispatchToStoreDefault = function mapDispatchToStoreDefault(dispatch) {
  return {
    dispatch: dispatch
  };
};

var GET_ERROR_MESSAGE = "\u9700\u8981\u901A\u8FC7 this.store.xxx \u83B7\u53D6 store \u4E2D\u7684\u72B6\u6001";
var SET_ERROR_MESSAGE = "\u9700\u8981\u901A\u8FC7 dispatch \u4FEE\u6539 store \u4E2D\u7684\u72B6\u6001";
function defineProperty(instance, committing, currentState, currentDispatch) {
  Object.defineProperty(instance.data, 'store', {
    get: function get() {
      assert(!committing.state, GET_ERROR_MESSAGE);
      return GET_ERROR_MESSAGE;
    },
    set: function set() {
      assert(!committing.state, SET_ERROR_MESSAGE);
    },
    enumerable: false
  });
  Object.defineProperty(instance, 'store', {
    get: function get() {
      return _extends({}, currentState, {}, currentDispatch);
    },
    set: function set() {
      assert(!committing.state, SET_ERROR_MESSAGE);
    }
  });
}

function mixinData(options, state) {
  var _options$data;

  return _extends({}, options, {
    data: _extends({}, (_options$data = options.data) != null ? _options$data : {}, {
      store: state
    })
  });
}

function pageLifetimes(options, load, unload) {
  var oldLoad = options.onLoad;
  var oldUnload = options.onUnload;

  function onLoad(query) {
    load.call(this);

    if (oldLoad !== undefined) {
      oldLoad.call(this, query);
    }
  }

  function onUnload() {
    unload.call(this);

    if (oldUnload !== undefined) {
      oldUnload.call(this);
    }
  }

  return _extends({}, options, {
    onLoad: onLoad,
    onUnload: onUnload
  });
}

function componentLifetimes(options, load, unload) {
  var _options$lifetimes$at, _options$lifetimes, _options$lifetimes$de, _options$lifetimes2, _options$lifetimes3;

  var oldLoad = (_options$lifetimes$at = (_options$lifetimes = options.lifetimes) === null || _options$lifetimes === void 0 ? void 0 : _options$lifetimes.attached) != null ? _options$lifetimes$at : options.attached;
  var oldUnload = (_options$lifetimes$de = (_options$lifetimes2 = options.lifetimes) === null || _options$lifetimes2 === void 0 ? void 0 : _options$lifetimes2.detached) != null ? _options$lifetimes$de : options.detached;

  function attached() {
    load.call(this);

    if (oldLoad !== undefined) {
      oldLoad.call(this);
    }
  }

  function detached() {
    unload.call(this);

    if (oldUnload !== undefined) {
      oldUnload.call(this);
    }
  }

  return _extends({}, options, {
    attached: attached,
    detached: detached,
    lifetimes: _extends({}, (_options$lifetimes3 = options.lifetimes) != null ? _options$lifetimes3 : {}, {
      attached: attached,
      detached: detached
    })
  });
}

function mixinLifetimes(type, options, load, unload) {
  if (type === 'page') {
    return pageLifetimes(options, load, unload);
  }

  return componentLifetimes(options, load, unload);
}

function connect(type, mapStateToStore, mapDispatchToStore) {
  if (mapStateToStore === void 0) {
    mapStateToStore = mapStateToStoreDefault;
  }

  if (mapDispatchToStore === void 0) {
    mapDispatchToStore = mapDispatchToStoreDefault;
  }

  var committing = createCommitting();
  var currentState = mapStateToStore(useState());
  var currentDispatch = mapDispatchToStore(useDispatch());
  verifyPlainObject('mapStateToStore()', currentState);
  verifyPlainObject('mapDispatchToStore()', currentDispatch);
  var instances = [];
  var unsubscribe;

  function updater(state) {
    committing.commit(function (end) {
      var nextState = mapStateToStore(state);
      var updateState = diff(currentState, nextState);

      if (isEmptyObject(updateState)) {
        return;
      }

      Object.assign(currentState, nextState);
      instances.forEach(function (instance) {
        return instance.setData(updateState);
      });
      end();
    });
  }

  return function connected(options) {
    function load() {
      defineProperty(this, committing, currentState, currentDispatch);
      instances.push(this);

      if (unsubscribe === undefined) {
        unsubscribe = batchUpdate.subscribe(updater);
      }
    }

    function unload() {
      var index = instances.indexOf(this);
      instances.splice(index, 1);

      if (instances.length === 0 && unsubscribe !== undefined) {
        unsubscribe();
        unsubscribe = undefined;
      }
    }

    return mixinLifetimes(type, mixinData(options, currentState), load, unload);
  };
}

/**
 * @param mapStateToStore 订阅 state
 * @param mapDispatchToStore 包装 dispatch
 */

function ConnectPage(mapStateToStore, mapDispatchToStore) {
  return function Connected(options) {
    return connect('page', mapStateToStore, mapDispatchToStore)(options);
  };
}

/**
 *
 * @param mapStateToStore
 * @param mapDispatchToStore
 */

function ConnectComponent(mapStateToStore, mapDispatchToStore) {
  return function Connected(options) {
    return connect('component', mapStateToStore, mapDispatchToStore)(options);
  };
}

exports.ConnectComponent = ConnectComponent;
exports.ConnectPage = ConnectPage;
exports.Provider = Provider;
exports.useDispatch = useDispatch;
exports.useState = useState;
exports.useStore = useStore;
