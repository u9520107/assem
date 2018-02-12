import Injector from '../lib/injector';

class Module {
  constructor(...args) {
    this._arguments = args;
  }

  _initialize() {

  }

  _moduleWillMount() {

  }

  _moduleDidMount() {

  }

  _moduleWillUnmount() {

  }

  _setState() {

  }

  _resetState() {

  }

  create() {
    return Injector.bootstrap(this);
  }

  get state() {
    if (typeof this._getState !== 'function') {
      throw new Error('State APIs Setup Error')
    }
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
}
