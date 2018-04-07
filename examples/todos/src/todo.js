import Module from './module'

export default class Todo extends Module {
  getActionTypes() {
    return [
      'add'
    ];
  }

  getReducers(actionTypes) {
    return {
      todo: this.getTodoReducer(actionTypes),
    }
  }

  getTodoReducer(types, initialValue) {
    return (state = initialValue || [], { type, todo }) => {
      return types.add === type  ? [...state, todo] : state
    }
  }

  add(todo) {
    this.dispatch({ type: this.actionTypes.add, todo })
  }
}