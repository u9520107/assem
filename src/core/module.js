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
    this._setState(actionTypes.mounting);
    this.mount();
  }

  _moduleDidMount() {
    this._setState(actionTypes.mounted);
    this.moduleDidMount();
  }

  _moduleWillInitialize() {
    this._setState(actionTypes.pending);
    this.moduleWillInitialize();
  }

  _initialize() {
    this._setState(actionTypes.initializing);
    this.initialize();
  }

  _moduleDidInitialize() {
    this._setState(actionTypes.initialized);
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
