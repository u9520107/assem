import moduleStatuses from './moduleStatuses';

export function getModuleStatusReducer(types, initialValue) {
  return (state = initialValue || moduleStatuses.pending, { type }) => {
    console.log(type);
    switch (type) {
      case types.init:
        return moduleStatuses.pending;
      case types.reset:
        return moduleStatuses.resetting;
      case types.initSuccess:
        return moduleStatuses.ready;
      default:
        return state;
    }
  };
}
