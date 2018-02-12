import Module from '../../src/core/module';
import module from '../../src/api/module';
import Storage from '../storage';

class Phone extends Module {

}

@module({
  name: 'Auth',
  dependencies: ['Storage'],
})
class Auth extends Module {

}
