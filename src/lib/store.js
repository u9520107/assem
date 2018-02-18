export default class Store {

  constructor(initialState = {}, subscribe) {
    if (typeof subscribe !== 'function') {
      throw new Error(`default Store's subscribe must be a function.`);
    }
    this._state = initialState;
    this._subscribe = subscribe;
  }

  getState() {
    return this._state;
  }

  setState(state) {
    const [key, value] = Object.entries(state);
    this._state[key] = value;
    this._subscribe({
      key,
      value,
    });
  }
}
