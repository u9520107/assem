import Module from '../../src/core/module';
// import { moduleFactory } from '../../src/api/module';
// import Storage from './storage';
// import Auth from './auth';
import { createStore, combineReducers } from '../../src/lib/store';

Module.combineReducers = combineReducers;

class Index extends Module {

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
    // this.addModule({
    //   name: 'storage',
    //   module: new Index(),
    // });
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

}

const config = {
  version: '0.1'
};

// const phone = Phone.create(config);
const phone = new Phone(config);
const store = createStore(phone.reducers);
store.subscribe(() => {
  console.log('[store.subscribe]', phone.state.status);
});
phone.setStore(store);
