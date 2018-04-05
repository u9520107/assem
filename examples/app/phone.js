import CoreModule from '../../src/core/module';
import Base from '../../src/core/base';
import { createStore, combineReducers } from 'redux';
// import { createStore, combineReducers } from '../../src/lib/store';
import clone from '../../src/utils/clone';

// import { moduleFactory } from '../../src/api/module';
// import Storage from './storage';
// import Auth from './auth';

const Module = clone(Base)(CoreModule)
Module.combineReducers = combineReducers;
Module.createStore = createStore;

// function getTestFieldReducer(types, initialValue) {
//   return (state = initialValue || 'default', { type }) => {
//     switch (type) {
//       case types.setTest:
//         return 'isSetTest';
//       case types.initSuccess:
//         return 'isSetTestInit';
//       default:
//         return state;
//     }
//   };
// }
class Contact extends Module {
  async moduleWillInitialize() {
    await new Promise((r)=>setTimeout(r,3000));
  }
}
class Index extends Module {
  onStateChange() {

  }
  //
  async moduleWillInitialize() {
    await new Promise((r)=>setTimeout(r,2000));
  }
}

// @moduleFactory({
//   providers: [
//     Auth,
//     Storage,
//   ]
// })
class Phone1 extends Module {
  constructor(params, modules) {
    super(params, modules);
    this.bootstrap();
  }
  // get index (){
  //   return this._modules.index;
  // }
  // onStateChange() {
  //   console.log('[store.subscribe] ->', this.state.status, this.index.state.status);
  // }

  getReducers(actionTypes) {
    return {
      kkk: Module.combineReducers({
        sss: this.getTestFieldReducer(actionTypes)
      }),
      // index: this._modules.index.reducers,
    }
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

  getActionTypes() {
    return [
      'setTest'
    ]
  }

  async moduleWillInitializeSuccess() {
    this.dispatch({
      type: this.actionTypes.setTest,
    })
  }
}

class Phone extends Phone1 {}

// const index = new Index({
//   indexVersion: '0.0.1'
// });
const contact = new Contact();
const index = new Index({},{
  contact,
});
const phone = new Phone({}, {
  index,
});
// const phone = Phone.create({
//   version: '0.1'
// }, { index });
phone.store.subscribe(() => {
  console.log('[store.subscribe]', phone.state.status, phone._modules.index.status, phone._modules.contact.status);
});
