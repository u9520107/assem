import getActionTypes from './actionTypes';
import moduleStatuses from './moduleStatuses';
import { getModuleStatusReducer } from './reducers';
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
    if (Object.keys(this._modules).length === 0) {
      const key = this.constructor.name.toLowerCase();
      this.getState = params.getState || (() => (this._store.getState.call(this)[key]));
    }
    this._actionTypes = this._getActionTypes();
  }

  bootstrap() {
    this.setStore(Module.createStore(this.reducers))
  }

  get _reducers() {
    const reducers = this._getReducers(this.actionTypes, {});
    return Module.combineReducers(reducers);
  }

  _moduleWillInitialize() {
    // return this._getState();
  }

  async _initialize() {
    this._moduleWillInitialize();
    await this.moduleWillInitialize();
    this._dispatch({
      type: this.actionTypes.init,
    });
    await this._moduleDidInitialize();
  }

  async _moduleDidInitialize() {
    if (this._moduleInitializeCheck()) {
      this._dispatch({
        type: this.actionTypes.initSuccess,
      });
      await this.moduleDidInitialize();
    } else {
      await new Promise((resolve) => setTimeout(resolve));
      await this._moduleDidInitialize();
    }
  }

  _moduleInitializeCheck() {
    return Object.values(this._modules).every( module => module.ready);
  }

  _onStateChange() {
    this.onStateChange();
  }

  _setStore(store = {}) {
    if (this._store) return;
    Object.defineProperty(this, '_store', {
      ...DEFAULT_PROPERTY,
      value: store,
    });
    let {
      subscribe,
      getState,
      dispatch,
    } = this._store;
    getState = !this.parentModule || !this.getState ? getState.bind(this) : this.getState;
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
        value: getState,
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
    Object.values(this._modules).forEach( module => {
      module.parentModule = this;
      module.setStore(this._store);
    });
  }

  async _resetModule() {
    this._dispatch({
      type: this.actionTypes.reset,
    });
    await this.moduleWillReset();
    await this._moduleResetCheck();
    await this._initialize();
    await this.moduleDidReset();
  }

  async _moduleResetCheck() {}

  _getReducers(actionTypes, initialValue = {}) {
    const reducers = this.getReducers(actionTypes, initialValue);
    const subReducers = Object
      .entries(this._modules)
      .reduce((reducers, [key, module]) => {
        reducers[key] = module.reducers;
        return reducers
      },{});
    return {
      ...reducers,
      ...subReducers,
      status: getModuleStatusReducer(actionTypes, initialValue.status),
    };
  }

  _getActionTypes() {
    return getActionTypes(this.getActionTypes(), this.constructor.name);
  }

  addModule({ name, module}) {
    this[name] = module;
  }

  static create(config, modules) {
    const  RootModule = this;
    const rootModule = new RootModule(config, modules);
    Module.boot(rootModule);
    return rootModule;
    // return Injector.bootstrap(this, config);
  }

  static boot(module) {
    module.setStore(Module.createStore(module.reducers));
  }

  getReducers() {
    return {}
  }

  getActionTypes() {
    return [];
  }

  onStateChange() {}

  moduleWillInitialize() {}

  moduleDidInitialize() {}

  moduleWillReset(){}

  moduleDidReset(){}

  setStore(store = {}) {
    this._setStore(store);
    this._initModule();
  }

  dispatch(action) {
    return this._dispatch(action);
  }

  get actionTypes() {
    return this._actionTypes;
  }

  get reducers() {
    return this._reducers;
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
