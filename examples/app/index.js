import Module from '../../src/core/module';
import { createStore, combineReducers } from 'redux';
// import { createStore, combineReducers } from '../../src/lib/store';

Module.combineReducers = combineReducers;

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

  onStateChange() {
    console.log('this.state',this.state)
  }

  async moduleWillInitialize() {
    await new Promise((r)=>setTimeout(r,1000));
    console.log('moduleWillInitialize: ready ->', this.ready)
  }

  async moduleDidInitialize() {
    console.log('moduleDidInitialize: ready ->', this.ready)
  }
}

const index = new Index();
const store = createStore(index._reducers);
store.subscribe(() => {
  console.log(store.getState.apply(index));
});
index.setStore(store);
