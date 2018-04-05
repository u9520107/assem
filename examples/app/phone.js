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
  // onStateChange() {
  //   // console.log(this.state,' index')
  // }
  //
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
  // constructor(params, modules) {
  //   super(params, modules);
  //   // this.bootstrap();
  // }
  // get index (){
  //   return this._modules.index;
  // }
  // onStateChange() {
  //   console.log('[store.subscribe] ->', this.state.status, this.index.state.status);
  // }

  getReducers(actionTypes) {
    return {
      kkk: Module.combineReducers({
        sss: getTestFieldReducer(actionTypes)
      }),
      // index: this._modules.index.reducers,
    }
  }

  getActionTypes() {
    return [
      'setTest'
    ]
  }

  moduleDidInitialize() {
    this.dispatch({
      type: this.actionTypes.setTest,
    })
  }
}

const index = new Index({
  indexVersion: '0.0.1'
});
const phone = Phone.create({
  version: '0.1'
}, { index });
phone.store.subscribe(() => {
  console.log('[store.subscribe]', phone.state.status, phone._modules.index.state.status, phone.state.kkk.sss);
});
