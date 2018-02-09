import Injector from './injector';

class Module {
  constructor(...args) {
    this.__arguments = args;
  }

  create() {
    return Injector.bootstrap(this);
  }

  _setState() {

  }

  _reSetSate() {

  }

  _initialize() {

  }

  _moduleWillMount() {

  }

  _moduleDidMount() {

  }

  _moduleWillUnmount() {

  }

  get state() {
    return this.__arguments.state;
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
