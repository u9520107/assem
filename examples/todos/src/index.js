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

const app = UI.create({
  component: Box
}, {
  index: new IndexModule()
});

const View = app.component;

class App extends Component {
  render() {
    return (
      <Provider store={app.store} >
        <View app={app}/>
      </Provider>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));