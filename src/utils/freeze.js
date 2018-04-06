const warn = (key) => {
  throw new TypeError(`Enum key:'${key}' is read only`)
};

export default function freeze(object) {
  return new Proxy(object, {
    set (target, key, value) {

    },
    get (target, key) {
      if (!(key in target)) {
        warn(key);
      }
      return Reflect.get(target, key);
    },
    deleteProperty (target, key) {
      warn(key);
    },
    setPrototypeOf (target, proto) {
      throw new TypeError(`Enum is read only`);
    },
    defineProperty(target, key, property) {
      warn(key);
    }
  });
}
