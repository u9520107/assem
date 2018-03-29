import depend from '../../src/lib/depend';
import StorageModule from './module';
import dependence from './dependence';

const getStorage = depend(dependence, StorageModule);
const Storage = getStorage();

export {
  Storage as default,
  StorageModule,
  getStorage,
}
