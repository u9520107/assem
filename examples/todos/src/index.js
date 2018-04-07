import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';

import Example from './example';
import Count from './count';
import Todo from './todo';
import Module from './module';

class AssembleExample extends Module {
  state(_, { app }) {
    return {
      status: app._modules.example.state.status
    };
  }

  action(_, { app }) {
    return {
      action: () => {}
    };
  }

  get component() {
    return connect(this.state, this.action)(this._arguments.component);
  }
}

class ExampleUI extends Component {
  render() {
    return <div>{this.props.status}</div>;
  }
}

class AssembleCount extends Module {
  state(_, { app }) {
    return {
      count: app._modules.count.state.count
    };
  }

  action(_, { app }) {
    return {
      calculate: (...args) => app._modules.count.calculate(...args)
    };
  }

  get component() {
    return connect(this.state, this.action)(this._arguments.component);
  }
}

class CountUI extends Component {
  render() {
    return (
      <div>
        <button onClick={() => this.props.calculate(-1)}>-</button>
        {this.props.count}
        <button onClick={() => this.props.calculate(1)}>+</button>
      </div>
    );
  }
}

class AssembleTodo extends Module {
  state(_, { app }) {
    return {
      todo: app._modules.todo.state.todo
    };
  }

  action(_, { app }) {
    return {
      add: (...args) => app._modules.todo.add(...args)
    };
  }

  get component() {
    return connect(this.state, this.action)(this._arguments.component);
  }
}

class TodoUI extends Component {
  render() {
    return (
      <div>
        <input ref={(ref) => this.input = ref}/>
        <button onClick={() => {
          this.props.add(this.input.value);
          this.input.value = '';
        }}>Add
        </button>
        <ul>
          {this.props.todo.map((item, key) => (<li key={key}>{item}</li>))}
        </ul>
      </div>
    );
  }
}

class AppView extends Module {
  getComponents() {
    return this._arguments.modules
      .map(module => React.createElement(module.component, { app: this }));
  }

  render() {
    const components = this.getComponents();
    return React.createElement('div', null, ...components);
  }
}

const assembleExample = new AssembleExample({
  component: ExampleUI,
  modules: [new Example()],
});

const assembleCount = new AssembleCount({
  component: CountUI,
  modules: [new Count()],
});

const assembleTodo = new AssembleTodo({
  component: TodoUI,
  modules: [new Todo()]
});

const app = AppView.create({
  modules: [assembleExample, assembleCount, assembleTodo]
});

class App extends Component {
  render() {
    return (
      <Provider store={app.store}>
        {app.render()}
      </Provider>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));