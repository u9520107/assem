export default function freeze(object) {
  return new Proxy(object, {
    set (target, key, value) {
      throw new TypeError(`Enum key:'${key}' is read only`);
    },
    get (target, key) {
      if (!(key in target)) {
        throw new ReferenceError(`Enum key:'${key}' is not exist.`);
      }
      return Reflect.get(target, key);
    },
    deleteProperty (target, key) {
      throw new TypeError(`Enum key:'${key}'is read only`);
    }
  });
}
