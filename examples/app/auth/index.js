import depend from '../../src/lib/depend';
import AuthModule from './module';
import dependence from './dependence';

const getAuth = depend(dependence, AuthModule);
const Auth = getAuth();

export {
  Auth as default,
  AuthModule,
  getAuth,
}
