import Module from '../../../src/core/module';
import { createStore, combineReducers } from 'redux';
// import { createStore, combineReducers } from '../../src/lib/store';

Module.combineReducers = combineReducers;
Module.createStore = createStore;

export default class Index extends Module {
  constructor({...args} = {}) {
    const test = {
      textArgs: 1,
    };
    super({
      ...args,
      test,
    });
    this.test = test;
  }

  getActionTypes() {
    return [
      'setTest'
    ];
  }

  getReducers(actionTypes) {
    return {
      testField: this.getTestFieldReducer(actionTypes),
    }
  }

  onStateChange() {
    console.log('       onStateChange: this.state.status ->',this.state.status);
  }

  async moduleWillInitialize() {
    await new Promise((r)=>setTimeout(r,1000));
    console.log('moduleWillInitialize: this.state.status ->', this.state.status);
  }

  async moduleDidInitialize() {
    this._dispatch({
      type: this.actionTypes.setTest,
    });
    console.log(' moduleDidInitialize: this.state.status ->', this.state.status);
  }

  async moduleWillReset() {
    console.log('     moduleWillReset: this.state.status ->', this.state.status);
  }

  async moduleDidReset() {
    console.log('      moduleDidReset: this.state.status ->', this.state.status);
  }

  getTestFieldReducer(types, initialValue) {
    return (state = initialValue || 'default', { type }) => {
      switch (type) {
        case types.setTest:
          return 'isSetTest';
        case types.initSuccess:
          return 'isSetTestInit';
        default:
          return state;
      }
    };
  }
}
