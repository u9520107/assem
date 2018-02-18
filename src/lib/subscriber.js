const __DEV__ = process.env.NODE_ENV === 'development';

export default class Subscriber {
  constructor() {
    this._queue = [];
  }

  report(...args) {
    this._queue.forEach(notice => notice(...args));
  }

  add(subscriber) {
    if (this._queue.indexOf(subscriber) !== -1) {
      if (__DEV__) {
        console.warn(`subscriber already exist.`);
      }
      return;
    }
    this._queue.push(subscriber);
    return this;
  }

  remove(subscriber) {
    const index = this._queue.indexOf(subscriber);
    if (index === -1) {
      if (__DEV__) {
        console.warn(`subscriber does not exist.`);
      }
      return;
    }
    this._queue.splice(index, 1);
    return this;
  }
}
