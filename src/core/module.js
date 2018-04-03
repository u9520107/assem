import actionTypes from './actionTypes';
import moduleStatuses from './moduleStatuses';
import { getModuleStatusReducer } from './reducers';
// import Subscriber from '../lib/subscriber';
// import Injector from '../lib/injector';

const __DEV__ = process.env.NODE_ENV === 'development';

const DEFAULT_PROPERTY = {
  configurable: false,
  enumerable: false,
  writable: false,
};

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
    this.actionTypes = actionTypes;
    const reducers = {
      status: getModuleStatusReducer(this.actionTypes)
    };
    this._reducers = typeof Module.combineReducers === 'function' ?
      Module.combineReducers(reducers) :
      reducers;
  }

  async _initialize() {
    await this.moduleWillInitialize();
    this._dispatch({
      type: this.actionTypes.initSuccess,
    });
    await this._moduleDidInitialize();
  }

  async _moduleDidInitialize() {
    this._dispatch({
      type: this.actionTypes.initSuccess,
    });
    await this.moduleDidInitialize();
  }

  _onStateChange() {
    this.onStateChange();
  }

  _setStore(store = {}) {
    Object.defineProperty(this, '_store', {
      ...DEFAULT_PROPERTY,
      value: store,
    });
    let {
      subscribe,
      getState,
      dispatch,
    } = this._store;
    if (
      typeof subscribe !== 'function' ||
      typeof getState !== 'function' ||
      typeof dispatch !== 'function' ||
      __DEV__
    ) {
      console.warn(`${this.constructor.name} Module did't correctly set custom 'Store'.`);
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
      }
    });
    // forEach this._store
  }

  _initModule() {
    this._subscribe(this._onStateChange.bind(this));
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
