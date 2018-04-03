import Module from '../../src/core/module';
// import { createStore, combineReducers } from 'redux';
import { createStore, combineReducers } from '../../src/lib/store';

Module.combineReducers = combineReducers;

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
    console.log('this.state.testField',this.state.testField)
  }

  async moduleWillInitialize() {
    await new Promise((r)=>setTimeout(r,1000));
    console.log('moduleWillInitialize: ready ->', this.ready)
  }

  async moduleDidInitialize() {
    this._dispatch({
      type: this.actionTypes.setTest,
    });
    console.log('moduleDidInitialize: ready ->', this.ready)
  }
}

const index = new Index();
const store = createStore(index._reducers);
store.subscribe(() => {
  // console.log(store.getState.apply(index));
});
index.setStore(store);
