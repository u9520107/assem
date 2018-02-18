import Module from '../src/core/module';

class Index extends Module {
  onStateChange() {
    console.log('this.state',this.status)
  }
}

const index = new Index();
index.setStore();
console.log(Object.keys(index));

