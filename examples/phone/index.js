import Module from '../../src/lib/module';
import module from '../../src/api/module';

class Phone extends Module {

}

@module({
  name: 'Auth',
  dependencies: ['Storage']
})
class Auth extends Module {

}

@module({
  name: 'Storage'
})
class Storage extends Module {
  constructor(...args) {
    super(...args);
  }

  clear() {

  }

  getItem() {

  }

  key() {

  }

  get length() {

  }

  removeItem() {

  }

  setItem() {

  }
}
