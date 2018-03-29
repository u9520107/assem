import Module from '../../src/core/module';
import { moduleFactory } from '../../src/api/module';
import Storage from '../storage';
import Auth from '../auth';
import { createStore } from 'redux';

@moduleFactory({
  providers: [
    Auth,
    Storage,
  ]
})
class Phone extends Module {

}

const phone = Phone.create();


// createStore
const store = createStore(phone.stater);
// const { subscribe, dispatch, getState } = this._store;

phone.setStore(store);
