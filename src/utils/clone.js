export default (Clazz) => {
  return (ExtendsTarget) => {
    const prototype = ExtendsTarget.prototype;
    const prototypeExtends = {};
    Object
      .getOwnPropertyNames(prototype)
      .filter(i => i !== 'constructor')
      .forEach(key => {
        prototypeExtends[key] = Object.getOwnPropertyDescriptor(prototype, key);
      });
    Object.defineProperties(Clazz.prototype, prototypeExtends);

    const staticExtends = {};
    Object
      .getOwnPropertyNames(ExtendsTarget)
      .filter(i => !['length', 'prototype', 'name'].includes(i))
      .forEach(key => {
        staticExtends[key] = Object.getOwnPropertyDescriptor(ExtendsTarget, key);
      });
    Object.defineProperties(Clazz, staticExtends);
    return Clazz;
  };
}