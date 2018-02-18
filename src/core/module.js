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
    Object.defineProperty(this, '_store', {
      ...DEFAULT_PROPERTY,
      value: store,
    });
    let {
      subscribe,
      getState,
      setState,
    } = this._store;

    if (typeof subscribe !== 'function') {
      subscriber.add(this._onStateChange.bind(this));
      subscribe = subscriber.report.bind(subscriber);
      if (__DEV__) {
        console.warn(`${this.constructor.name} Module not custom 'subscribe'.`);
      }
    }

    if (typeof getState !== 'function') {
      Object.defineProperty(this, '_state', {
        ...DEFAULT_PROPERTY,
        value: {},
      });
      getState = defaultGetState.bind(this);
      if (__DEV__) {
        console.warn(`${this.constructor.name} Module not custom 'getState'.`);
      }
    }
    if (typeof setState !== 'function') {
      setState = defaultSetState.bind(this);
      if (__DEV__) {
        console.warn(`${this.constructor.name} Module not custom 'setState'.`);
      }
    }
    Object.defineProperties(this, {
      _setState: {
        ...DEFAULT_PROPERTY,
        value: setState,
      },
      _getState: {
        ...DEFAULT_PROPERTY,
        value: getState,
      },
      _subscribe: {
        ...DEFAULT_PROPERTY,
        value: subscribe,
      },
    });
    // forEach this._store
  }

  _initModule() {
    this._moduleWillInitialize();
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
