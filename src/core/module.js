import actionTypes from './actionTypes';
import Injector from '../lib/injector';

const DEFAULT_PROPERTY = {
  configurable: false,
  enumerable: false,
  writable: false,
};
//subscribe dispatch getState
class Module {
  constructor(params = {}, modules = {}) {
    const { setState, getState } = params;
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
    this._state = {};
    this._setState = setState || ((state) => {
      const [key, value] = Object.entries(state);
      this._state[key] = value;
    });
    this._getState = getState || (() => {
      return this._state;
    });
  }

  _mount() {
    const status = actionTypes.mounting;
    this._setState({ status });
    this.mount();
  }

  _moduleDidMount() {
    const status = actionTypes.mounted;
    this._setState({ status });
    this.moduleDidMount();
  }

  _moduleWillInitialize() {
    const status = actionTypes.pending;
    this._setState({ status });
    this.moduleWillInitialize();
  }

  _initialize() {
    const status = actionTypes.initializing;
    this._setState({ status });
    this.initialize();
  }

  _moduleDidInitialize() {
    const status = actionTypes.initialized;
    this._setState({ status });
    this.moduleDidInitialize();
  }

  _subscribe(callback) {
    this.onStateChange();
    if (typeof callback === 'function') {
      return callback();
    }
  }

  onStateChange() {}

  mount() {}

  moduleDidMount() {}

  moduleWillInitialize() {}

  initialize() {}

  moduleDidInitialize() {}

  static create() {
    return Injector.bootstrap(this);
  }

  setStore() {

  }

  _setStore() {

  }

  get store() {
    if (!this._store) {
      throw new Error('module has not been initialized...');
    }
    return this._store;
  }

  get state() {
    return this._getState();
  }

  get status() {
    return this.state.status;
  }

  get dependencyMap() {
    return [];
  }
}

export {
  Module as default
};
