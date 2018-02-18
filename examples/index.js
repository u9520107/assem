import Module from '../src/core/module';

class Index extends Module {
  constructor({...args} = {}) {
    const test = {
      textArgs: 1,
    };
    super({
      ...args,
      test,
    });
    this.test = test;
  }
  onStateChange() {
    console.log('this.state',this.status)
  }
}

const index = new Index();
index.setStore();
console.log(Object.keys(index),index._arguments);

