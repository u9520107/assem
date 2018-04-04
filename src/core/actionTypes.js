import Enum from '../lib/Enum';

// export default new Enum([
//   'init',
//   'initSuccess',
//   'reset',
//   'resetSuccess',
// ]);

export default function getActionTypes(
  actionsTypes = [],
  prefix
) {
  return new Enum([
    'init',
    'initSuccess',
    'reset',
    ...actionsTypes,
  ], prefix);
}
