import actionTypes from './actionTypes';
import Injector from '../lib/injector';

const DEFAULT_PROPERTY = {
  configurable: false,
  enumerable: false,
  writable: false,
};

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
    const status  = actionTypes.mounting;
    this._setState({ status });
    this.mount();
  }

  _moduleDidMount() {
    const status  = actionTypes.mounted;
    this._setState({ status });
    this.moduleDidMount();
  }

  _moduleWillInitialize() {
    const status  = actionTypes.pending;
    this._setState({ status });
    this.moduleWillInitialize();
  }

  _initialize() {
    const status  = actionTypes.initializing;
    this._setState({ status });
    this.initialize();
  }

  _moduleDidInitialize() {
    const status  = actionTypes.initialized;
    this._setState({ status });
    this.moduleDidInitialize();
  }

  mount() {}

  moduleDidMount() {}

  moduleWillInitialize() {}

  initialize() {}

  moduleDidInitialize() {}

  static create() {
    return Injector.bootstrap(this);
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
