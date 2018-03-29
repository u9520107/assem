import actionTypes from './actionTypes';
import moduleStatuses from './moduleStatuses';
import Subscriber from '../lib/subscriber';
// import Injector from '../lib/injector';

const __DEV__ = process.env.NODE_ENV === 'development';

const DEFAULT_PROPERTY = {
  configurable: false,
  enumerable: false,
  writable: false,
};

function getModuleStatusReducer(types) {
  return (state = moduleStatuses.pending, { type }) => {
    switch (type) {
      case types.init:
        return moduleStatuses.initializing;

      case types.initSuccess:
        return moduleStatuses.ready;

      case types.reset:
        return moduleStatuses.resetting;

      case types.resetSuccess:
        return moduleStatuses.pending;

      default:
        return state;
    }
  };
}

function defaultGetState() {
  return this._state;
}

function defaultSetState(reducers, { type }) {
  Object.entries(reducers).forEach(([key, reducer]) => {
    this._state[key] = reducer(this._state[key], {type});
  });
  this._subscribe(); // TODO pass the changed State.
}

const subscriber = new Subscriber();

//subscribe dispatch getState
class Module {
  constructor(params = {}, modules = {}) {
    Object.defineProperties(this, {
      _arguments: {
        ...DEFAULT_PROPERTY,
        value: params,
      },
      _modules: {
        ...DEFAULT_PROPERTY,
        value: modules,
      }
    });
    this._reducers = {
      status: getModuleStatusReducer(actionTypes)
    };
    this.actionTypes = actionTypes;
  }

  _initialize() {
    this.moduleWillInitialize();
    // this._setState({ status });
    this._dispatch({
      type: this.actionTypes.initSuccess,
    });
    this._moduleDidInitialize();
  }

  _moduleDidInitialize() {
    this._dispatch({
      type: this.actionTypes.initSuccess,
    });
    this.moduleDidInitialize();
  }

  _onStateChange() {
    this.onStateChange();
  }

  _setStore(store) {
    Object.defineProperty(this, '_store', {
      ...DEFAULT_PROPERTY,
      value: store,
    });
    let {
      subscribe,
      getState,
      dispatch,
    } = this._store;
    if (typeof subscribe !== 'function') {
      subscriber.add(this._onStateChange.bind(this));
      subscribe = subscriber.report.bind(subscriber);
      if (__DEV__) {
        console.warn(`${this.constructor.name} Module not custom 'subscribe'.`);
      }
    }
    if (typeof getState !== 'function') {
      getState = defaultGetState.bind(this);
      if (__DEV__) {
        console.warn(`${this.constructor.name} Module not custom 'getState'.`);
      }
    }
    if (typeof dispatch !== 'function') {
      dispatch = (action) => defaultSetState.call(this, this._reducers, action);
      if (__DEV__) {
        console.warn(`${this.constructor.name} Module not custom 'setState'.`);
      }
    }
    Object.defineProperties(this, {
      _dispatch: {
        ...DEFAULT_PROPERTY,
        value: dispatch.bind(this),
      },
      _getState: {
        ...DEFAULT_PROPERTY,
        value: getState.bind(this),
      },
      _subscribe: {
        ...DEFAULT_PROPERTY,
        value: subscribe,
      },
      _state: {
        ...DEFAULT_PROPERTY,
        value: {},
      }
    });
    // forEach this._store
  }

  _initModule() {
    this._initialize();
    // this._initialize();
    // initialize
    // forEach subModule _initModule
  }

  onStateChange() {}

  moduleWillInitialize() {}

  moduleDidInitialize() {}

  // static create() {
  //   return Injector.bootstrap(this);
  // }

  setStore(store = {}) {
    this._setStore(store);
    this._dispatch({});
    this._initModule();
  }

  get store() {
    if (!this._store) {
      throw new Error(`${this.constructor.name} Module has not been initialized...`);
    }
    return this._store;
  }

  get state() {
    return this._getState();
  }

  get status() {
    return this.state.status;
  }

  get ready() {
    return this.status === moduleStatuses.ready;
  }

  get pending() {
    return this.status === moduleStatuses.pending;
  }
}

export {
  Module as default
};
