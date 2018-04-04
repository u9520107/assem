import Module from '../../../src/core/module';

function getIsLoginReducer(types, initialValue) {
  return (state = initialValue || false, { type }) => {
    switch (type) {
      case types.login:
        return false;
      case types.logout:
        return true;
      default:
        return state;
    }
  };
}

export default class Auth extends Module {
  constructor(params, modules) {
    super(params, modules);
  }

  getActionTypes() {
    return ['login'];
  }

  getReducers(actionTypes) {
    return {
      isLogin: getIsLoginReducer(actionTypes),
    }
  }

  autoLogin() {
    this.dispatch({type: this.actionTypes.login});
  }

  moduleDidInitialize() {
    this.autoLogin();
  }
}