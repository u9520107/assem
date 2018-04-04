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
    this.count = 1;
    this.now = new Date().getTime();
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
    console.log('this.state.status ->',this.state.status)
  }

  async moduleWillInitialize() {
    if(!this.now) {
      this.now = new Date().getTime();
    } else {
      console.log(new Date().getTime() - this.now)
    }
    // await new Promise((r)=>setTimeout(r,1000));
    console.log('moduleWillInitialize: ready ->', this.ready)
  }

  async moduleDidInitialize() {
    // this._dispatch({
    //   type: this.actionTypes.setTest,
    // });
    console.log(new Date().getTime() - this.now)
    console.log('moduleDidInitialize: ready ->', this.ready);
    this.count++;
    if (this.count === 3) return;
    await this._resetModule();
  }

  async moduleWillReset() {
    console.log('moduleWillReset')
  }

  async moduleDidReset() {
    console.log(new Date().getTime() - this.now);
    console.log('moduleDidReset')
  }
}

const index = new Index();
console.log(new Date().getTime() - index.now, 'test')
const store = createStore(index._reducers);
store.subscribe(() => {
  // console.log(store.getState.apply(index));
});
index.setStore(store);
