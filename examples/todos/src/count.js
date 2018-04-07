import Module from './module'

export default class Count extends Module {
  getActionTypes() {
    return [
      'calculate'
    ];
  }

  getReducers(actionTypes) {
    return {
      count: this.getCountReducer(actionTypes),
    }
  }

  getCountReducer(types, initialValue) {
    return (state = initialValue || 0, { type, count }) => {
      return types.calculate === type  ? count + state : state
    }
  }

  calculate(count) {
    this.dispatch({ type: this.actionTypes.calculate, count })
  }
}