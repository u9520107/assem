import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';

import Example from './example';
import Count from './count';
import Module from './module';

class AssemblingExample extends Module {
  state(_, { app }) {
    return {
      status: app._modules.example.state.status
    }
  }
  action(_, { app }) {
    return {
      action: () => {}
    }
  }
  get component() {
    return connect(this.state, this.action)(this._arguments.component)
  }
}

class ExampleUI extends Component {
  render() {
    return <div>{this.props.status}</div>
  }
}

class AssemblingCount extends Module {
  state(_, { app }) {
    return {
      count: app._modules.count.state.count
    }
  }
  action(_, { app }) {
    return {
      calculate: (...args) => app._modules.count.calculate(...args)
    }
  }
  get component() {
    return connect(this.state, this.action)(this._arguments.component)
  }
}

class CountUI extends Component {
  render() {
    return (
      <div>
        <button onClick={()=>this.props.calculate(-1)}>-</button>
        {this.props.count}
        <button onClick={()=>this.props.calculate(1)}>+</button>
      </div>
    )
  }
}

class AppView extends Module {
  constructor(params, modules) {
    super(params, modules);
    this.components = Object.keys(modules);
  }
  getComponent(key) {
    return this._modules[key].component;
  }

  getComponents() {
    return this.components
      .map(key => React.createElement(this.getComponent(key), {app: this}));
  }

  render() {
    const components = this.getComponents();
    return React.createElement('div', null, ...components);
  }
}

const assemblingExample = new AssemblingExample({
  component: ExampleUI
}, {
  example: new Example()
});

const assemblingCount =  new AssemblingCount({
  component: CountUI
}, {
  count: new Count()
});

const app = AppView.create({}, { assemblingExample, assemblingCount });

class App extends Component {
  render() {
    return (
      <Provider store={app.store} >
        {app.render()}
      </Provider>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));