import log from '../util/log';

// adapted from https://miguelmota.com/blog/memoization-caching-function-results-in-javascript/
// general purpose cache/memoizer, with localStorage persistence
// added support for promises

// Check for Local Storage Support
function supportLocalStorage() {
  try {
    return 'localStorage' in window && window.localStorage != null;
  } catch (e) {
    return false;
  }
}

// Memoization function.
function memoized(...args) {
  // Values object for caching results.
  this.memoizedValues = this.memoizedValues || {};

  // Stringify function arguments to make key.
  const key = JSON.stringify(Array.prototype.slice.call(args));

  // Check if result is cached
  if (this.memoizedValues[key] !== undefined) {
    log('Loaded from cache: %s => %s', key, this.memoizedValues[key]);
    return JSON.parse(this.memoizedValues[key]);

    // Check if result is in local storage.
  } if (supportLocalStorage && localStorage[`${this.name}:${key}`]) {
    log('Loaded from local storage: %s => %s', key, localStorage[`${this.name}:${key}`]);
    return JSON.parse(localStorage[`${this.name}:${key}`]);

    // Call the original function if result not found and store result.
  }

  const store = (id, value) => {
    // Store in local storage.
    if (supportLocalStorage) {
      localStorage[`${this.name}:${id}`] = value;
    }
  };

  const value = this.apply(this, args);

  if (Promise.resolve(value) === value) {
    value.then((data) => {
      store(key, JSON.stringify(data));
      this.memoizedValues[key] = JSON.stringify(data);
      return data;
    });

    return value;
  }
  const portableValue = JSON.stringify(value);
  store(key, portableValue);

  this.memoizedValues[key] = portableValue;

  return portableValue;
}

const memoize = fn => (
  (...args) => memoized.call(fn, ...args)
);

export default memoize;
