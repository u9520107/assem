import assemble from '../../../src/lib/assemble';
import storageModule from './storageModule';
import storageAssembly from './storageAssembly';

const getStorage = assemble(storageAssembly, storageModule);
const Storage = getStorage();

export {
  Storage as default,
  getStorage,
  storageModule,
  storageAssembly,
}