/* global global,process */
export default function handle() {
  const __DEV__ = process.env.NODE_ENV === 'development';
  if (__DEV__) {
    global['__DEV__'] = __DEV__
  }
}

const immediateFunc = global.handle || handle;
immediateFunc();
