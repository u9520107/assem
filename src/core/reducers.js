import moduleStatuses from './moduleStatuses';

export function getModuleStatusReducer(types, initialValue) {
  return (state = initialValue || moduleStatuses.pending, { type }) => {
    switch (type) {
      case types.init:
        return moduleStatuses.initializing;

      case types.initSuccess:
        return moduleStatuses.ready;

      case types.reset:
        return moduleStatuses.resetting;

      case types.resetSuccess:
        return moduleStatuses.pending;

      default:
        return state;
    }
  };
}
