export default class Base {
  constructor(params = {}, modules = {}) {
    this._instanced(params, modules);
  }
}