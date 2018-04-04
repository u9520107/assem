import Subscriber from './subscriber';

// const subscriber = new Subscriber();
// const subscribe = subscriber.add.bind(subscriber);
//
// export default class Store {
//   // constructor(initialState = {}, subscribe) {
//   //   if (typeof subscribe !== 'function') {
//   //     throw new Error(`default Store's subscribe must be a function.`);
//   //   }
//   //   this._state = initialState;
//   //   this._subscribe = subscribe;
//   // }
//   //
//   // getState() {
//   //   return this._state;
//   // }
//   //
//   // setState(state) {
//   //   const [key, value] = Object.entries(state);
//   //   this._state[key] = value;
//   //   this._subscribe({
//   //     key,
//   //     value,
//   //   });
//   // }
// }
//
// export function createStore(reducers) {
//   return Store
// }

const initStore = Symbol ? Symbol() : '@@@init@@@';
const subscriber = new Subscriber();
const subscribe = subscriber.add.bind(subscriber);
subscribe.report = subscriber.report.bind(subscriber);

const store = {
  getState: function () {
    if (typeof this._state === 'undefined') {
      this._dispatch({ type: initStore });
    }
    return this._state;
  },
  dispatch: function (action) {
    if (
      typeof action !== 'object' ||
      (
        typeof action.type !== 'string' &&
        action.type !== initStore
      )
    ) {
      throw new Error(`invalid action`);
    }
    if (action.type === initStore) {
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
