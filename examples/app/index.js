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

  moduleWillInitialize() {
    console.log('moduleWillInitialize: ready ->', this.ready)
  }

  moduleDidInitialize() {
    console.log('moduleDidInitialize: ready ->', this.ready)
  }
}

const index = new Index();
const store = createStore(index._reducers);
store.subscribe(() => {
  console.log(store.getState.apply(index));
});
index.setStore(store);
