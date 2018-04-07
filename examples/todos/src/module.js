import Module from '../../../src/core/module';
import { createStore, combineReducers } from 'redux';
// import { createStore, combineReducers } from '../../src/lib/store';

Module.combineReducers = combineReducers;
Module.createStore = createStore;

export default Module
