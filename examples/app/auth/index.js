import assemble from '../../../src/lib/assemble';
import AuthModule from './authModule';
import authAssembly from './authAssembly';

const getAuth = assemble(authAssembly, AuthModule);
const Auth = getAuth();

export {
  Auth as default,
  getAuth,
  AuthModule,
  authAssembly,
}
