import Module from '../../src/core/module';
import Subscriber from '../../src/lib/subscriber'
// import { createStore } from 'redux';

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

const store = {
  getState: function () {
    return this._state;
  },
  dispatch: function(action){
    Object.entries(this._reducers).forEach(([key, reducer]) => {
      this._state[key] = reducer(this._state[key], action);
    });
    this._subscribe();
  },
  subscriber: new Subscriber(),
}

const index = new Index();
index.setStore(store);
// console.log('moduleDone: ready ->', index.ready)


// const store = createStore(index.reducer);
// index.setStore(store);
//
// store.subscribe(() => {
//   console.log(store.getState().lastAction);
// });
