import actionTypes from './actionTypes';
import Subscriber from '../lib/subscriber';
// import Injector from '../lib/injector';

const __DEV__ = process.env.NODE_ENV === 'development';

const DEFAULT_PROPERTY = {
  configurable: false,
  enumerable: false,
  writable: false,
};

function defaultGetState() {
  return this._state;
}

function defaultSetState(state) {
  Object.entries(state).forEach(([key, value]) => {
    this._state[key] = value;
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
  }

  _moduleWillInitialize() {
    const status = actionTypes.pending;
    this._setState({ status });
    this.moduleWillInitialize();
    this._initialize();
  }

  _initialize() {
    const status = actionTypes.initializing;
    this._setState({ status });
    this.initialize();
    this._moduleDidInitialize();
  }

  _moduleDidInitialize() {
    const status = actionTypes.ready;
    this._setState({ status });
    this.moduleDidInitialize();
  }

  _onStateChange() {
    this.onStateChange();
  }

  /**
   * handle setState/getState/subscribe/_state
   * @param store
   * @private
   */
  _setStore(store) {
    this._store = store;
    let {
      subscribe,
      getState,
      setState,
    } = this._store;
    this._getState = getState;
    this._setState = setState;
    this._subscribe = subscribe;
    if (typeof subscribe !== 'function') {
      subscriber.add(this._onStateChange.bind(this));
      this._subscribe = subscriber.report.bind(subscriber);
      if (__DEV__) {
        console.warn(`${this.constructor.name} Module not custom 'subscribe'.`);
      }
    }

    if (typeof getState !== 'function') {
      this._state = {};
      this._getState = defaultGetState.bind(this);
      if (__DEV__) {
        console.warn(`${this.constructor.name} Module not custom 'getState'.`);
      }
    }
    if (typeof setState !== 'function') {
      this._setState = defaultSetState.bind(this);
      if (__DEV__) {
        console.warn(`${this.constructor.name} Module not custom 'setState'.`);
      }
    }
    this._moduleWillInitialize();
    // forEach this._store
  }

  _initModule() {
    // this._initialize();
    // initialize
    // forEach subModule _initModule
  }

  onStateChange() {}

  // mount() {}
  //
  // moduleDidMount() {}

  moduleWillInitialize() {}

  initialize() {}

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
    return this.status === actionTypes.ready;
  }

  get pending() {
    return this.status === actionTypes.pending;
  }

  get dependencyMap() {
    return [];
  }
}

export {
  Module as default
};
