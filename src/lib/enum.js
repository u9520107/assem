import freeze from '../utils/freeze';

const {
  prototype: { hasOwnProperty },
  entries,
  keys,
  defineProperties,
  defineProperty
} = Object;

class Enum {
  constructor(values = [], prefix) {
    const properties = {
      prefix: {
        value: prefix,
        configurable: false,
        enumerable: false,
        writable: false,
      },
    };
    values.forEach((item) => {
      properties[item] = Enum.setPrefix(item, prefix);
    });
    defineProperties(this, properties);
    if (Proxy && Reflect) {
      freeze(this);
    } else {
      Object.freeze(this)
    }
  }

  static setPrefix(item, prefix) {
    const value = prefix ? `${prefix}-${item}` : item;
    return {
      value,
      configurable: true,
      enumerable: true,
      writable: true,
    };
  }

  get size() {
    return entries(this).length;
  }

  add(item) {
    if (this[item]) {
      throw new Error(`'${item}' enumeration property already exists for this instance`);
    }
    const property = Enum.setPrefix(item, this.prefix);
    defineProperty(this, item, property);
  }

  remove(item) {
    if (!hasOwnProperty.call(this, item)) {
      throw new Error(`'${item}' enumeration property does not exist for this instance`);
    }
    delete this[item];
  }
}

const prefixCache = {};

function prefixEnum({ enumMap, prefix, base = enumMap }) {
  if (!prefix || prefix === '') return base;
  if (!prefixCache[prefix]) {
    prefixCache[prefix] = {};
  }
  const cache = prefixCache[prefix];
  if (!cache[base.prefix]) {
    cache[base.prefix] = new Enum(keys(enumMap), `${prefix}-${enumMap.prefix}`);
  }
  return cache[base.prefix];
}

export {
  Enum as default,
  prefixCache,
  prefixEnum,
};
