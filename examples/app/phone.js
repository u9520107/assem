import Module from '../../src/core/module';
// import { moduleFactory } from '../../src/api/module';
// import Storage from './storage';
// import Auth from './auth';
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
  constructor(...args) {
    super({
      initialValue: {}
    });
    // this.setStore(createStore(this.reducers));
  }

  onStateChange() {
    console.log(this.state,' index')
  }

  // async moduleWillInitialize() {
  //   await new Promise((r)=>setTimeout(r,1000));
  // }
}

// @moduleFactory({
//   providers: [
//     Auth,
//     Storage,
//   ]
// })
class Phone extends Module {
  constructor(params, modules) {
    super(params, modules);
    // const reducers = {};
    const index = new Index({
      getState: () => this.state.index
    });
    this.addModule({
      name: 'index',
      module: index,
    });
    const store = createStore(this.reducers);
    this.setStore(store);
    this.index.setStore(store);

    // reducers.index = this.index.reducers;
    // this.addModule({
    //   name: 'auth',
    //   module: new Auth({
    //     ttl: 30,
    //   },{
    //     storage: this.storage
    //   }),
    // });
  }

  onStateChange() {
    console.log('[store.subscribe]', this.state.status, this.index.state.status);
  }

  getReducers(actionTypes) {
    return {
      kkk: Module.combineReducers({
        sss: getTestFieldReducer(actionTypes)
      }),
      index: this.index.reducers,
    }
  }

}

const config = {
  version: '0.1'
};

// const phone = Phone.create(config);
new Phone(config);
// const store = createStore(phone.reducers);
// store.subscribe(() => {
//   console.log('[store.subscribe]', phone.state, phone.index.state);
// });
// phone.setStore(store);
