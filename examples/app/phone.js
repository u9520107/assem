// import { createStore, combineReducers } from 'redux';
import { createStore, combineReducers } from '../../src/lib/store';
import CoreModule from '../../src/core/module';
import Base from '../../src/core/base';
import clone from '../../src/utils/clone';
// import Auth from './auth/authModule'

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
  async moduleDidInitialize() {
    await new Promise(r=>setTimeout(r, 1000));
  }
}

// @moduleFactory({
//   providers: [
//     Auth,
//     Storage,
//   ]
// })
class BasePhone extends Module {
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

class Phone extends BasePhone {
  async moduleDidReset() {
    console.log('xxxxxx', this._modules.contact.status)
  }
}

// const index = new Index({
//   indexVersion: '0.0.1'
// });
class Account extends Module{}
class Auth extends Module{}
const account = new Account();
const auth = new Auth({
  modules: [account],
});
const contact = new Contact({
  modules: [account],
});
const index = new Index({
  modules: [contact],
});
const phone = new Phone({
  modules: [index, auth]
});
// const phone = Phone.create({
//   version: '0.1'
// }, { index });
phone.store.subscribe(() => {
  console.log('[store.subscribe]', phone._modules.auth.status, phone._modules.contact.status, phone._modules.account.status);
});

// setTimeout(()=> {
//   phone.resetModule();
// }, 5000);
//
// setTimeout(()=> {
//   phone.resetModule();
// }, 15000);
