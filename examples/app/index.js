import Module from '../../src/core/module';
// import { createStore, combineReducers } from 'redux';
import { createStore, combineReducers } from '../../src/lib/store';

Module.combineReducers = combineReducers;
Module.createStore = createStore;

function getTestFieldReducer(types, initialValue) {
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

class Index extends Module {
  constructor({...args} = {}) {
    const test = {
      textArgs: 1,
    };
    super({
      ...args,
      test,
    });
    this.test = test;
    this.count = 1;
    this.now = new Date().getTime();
    this.bootstrap();
    // this.setStore(Module.createStore(this.reducers))
  }

  getActionTypes() {
    return [
      'setTest'
    ];
  }

  getReducers(actionTypes) {
    return {
      testField: getTestFieldReducer(actionTypes),
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
    this.count++;
    if (this.count > 2) return;
    await this._resetModule();
  }

  async moduleWillReset() {
    console.log('     moduleWillReset: this.state.status ->', this.state.status);
  }

  async moduleDidReset() {
    console.log('      moduleDidReset: this.state.status ->', this.state.status);
  }
}

const index = new Index();
// const index = Index.create();
// const store = createStore(index._reducers);
index.store.subscribe(() => {
  // console.log('[store.subscribe]', index.state.status);
});

