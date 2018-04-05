import Subscriber from './subscriber';

const INIT_STORE = Symbol ? Symbol() : '@@@init@@@';

const subscriber = new Subscriber();
const subscribe = subscriber.add.bind(subscriber);
subscribe.report = subscriber.report.bind(subscriber);

export function createStore(reducer) {
  return {
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
      this._state = reducer(this._state, action);
      this._subscribe.report();
    },
    subscribe,
  };
}

export const combineReducers = (reducers) => {
  return (state = {}, action) => {
    return Object.entries(reducers).reduce((nextState, [key, reducer]) => {
      nextState[key] = reducer(state[key], action);
      return nextState;
    }, state);
  }
};
