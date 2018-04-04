import Subscriber from './subscriber';

const INIT_STORE = Symbol ? Symbol() : '@@@init@@@';

const subscriber = new Subscriber();
const subscribe = subscriber.add.bind(subscriber);
subscribe.report = subscriber.report.bind(subscriber);

const store = {
  getState: function () {
    if (typeof this._state === 'undefined') {
      this._dispatch({ type: INIT_STORE });
    }
    return this._state;
  },
  dispatch: function (action) {
    if (
      typeof action !== 'object' ||
      (
        typeof action.type !== 'string' &&
        action.type !== INIT_STORE
      )
    ) {
      throw new Error(`invalid action`);
    }
    if (action.type === INIT_STORE) {
      this._state = {};
    }
    Object.entries(this._reducers).forEach(([key, reducer]) => {
      this._state[key] = reducer(this._state[key], action);
    });
    this._subscribe.report();
  },
  subscribe,
};

export function createStore() {
  return store;
}

export const combineReducers = (reducers) => reducers;
