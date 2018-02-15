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
    this._setState({ status: 'mounting' });
  }

  _moduleDidMount() {
    this._setState({ status: 'mounted' });
  }

  _moduleWillInitialize() {
    this._setState({ status: 'pending' });
  }

  _initialize() {
    this._setState({ status: 'initializing' });
  }

  _moduleDidInitialize() {
    this._setState({ status: 'ready' });
  }

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
