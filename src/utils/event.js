const __DEV__ = process.env.NODE_ENV === 'development';

class Event {
  constructor() {
    this._events = {};
  }

  on(
    eventType,
    callback,
    {
      once = false,
      priority = false,
    } = {}
  ) {
    const listeners = this._events[eventType] || [];
    const isExist = listeners.indexOf(callback) > -1;
    const listener = {callback, once};
    if (isExist) {
      throw new Error(`Event type ${eventType} has been registered, please re-register it.`);
    }
    if (priority) {
      listeners.unshift(listener);
    } else {
      listeners.push(listener);
    }
    this._events[eventType] = listeners;
  }

  off(eventType, callback) {
    const listeners = this._events[eventType];
    if (listeners) {
      const index = listeners
        .findIndex(listener => listener.callback === callback);
      const isExist = index > -1;
      if (isExist) {
        listeners.splice(index, 1);
      } else if (__DEV__) {
        console.warn(`Event type '${eventType}' listener removed the failure.`);
      }
    } else if (__DEV__){
      console.warn(`Event type '${eventType}' does not exist.`);
    }
  }

  remove(eventType) {
    if (this._events[eventType]) {
      delete this._events[eventType];
    } else if(__DEV__) {
      console.warn(`Event type '${eventType}' does not exist.`);
    }
  }

  emit(eventType, ...args) {
    const listeners = this._events[eventType];
    if (
      !Array.isArray(listeners)
    ) {
      throw new Error(`Event type ${eventType} should be registered before emit it.`);
    } else if (listeners.length === 0) {
      throw new Error(`Event type ${eventType} has not any listener.`);
    }
    listeners.forEach(({ callback, once }, index) => {
      callback.apply(this, args);
      if (once) {
        listeners.splice(index, 1);
      }
    });
  }
}

const event = new Event();

export {
  event as default,
  Event
}
