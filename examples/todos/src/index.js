import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';

import IndexModule from './module';
import Module from '../../../src/core/module';

class UI extends Module {
  state(_, { app }) {
    return {
      testField: app._modules.index.state.testField
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

class Box extends Component {
  render() {
    return <div>{this.props.testField}</div>
  }
}

class AppView extends Module {
  get component() {
    return this._modules.ui.component;
  }
  render() {
    return React.createElement(this.component, {app});
  }
}

const ui = new UI({
  component: Box
}, {
  index: new IndexModule()
});

const app = AppView.create({}, { ui });

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