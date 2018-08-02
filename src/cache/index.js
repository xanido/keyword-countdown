// adapted from https://miguelmota.com/blog/memoization-caching-function-results-in-javascript/
// general purpose cache/memoizer, with localStorage persistence
// added support for promises

// Check for Local Storage Support
function supportLocalStorage() {
    try {
        return 'localStorage' in window && window['localStorage'] != null;
    } catch (e) {
        return false;
    }
}

// Memoization function.
Function.prototype.memoized = function() {
    // Values object for caching results.
    this._values = this._values || {};

    // Stringify function arguments to make key.
    var key = JSON.stringify(Array.prototype.slice.call(arguments));

    // Check if result is cached
    if (this._values[key] !== undefined) {
        console.log('Loaded from cache: %s => %s', key, this._values[key]);
        return JSON.parse(this._values[key])

        // Check if result is in local storage.
    } else if (supportLocalStorage && localStorage[this.name+':'+key]) {
        console.log('Loaded from local storage: %s => %s', key, localStorage[this.name+':'+key]);
        return JSON.parse(localStorage[this.name+':'+key]);

        // Call the original function if result not found and store result.
    } else {

        const store = (key, value) => {
            // Store in local storage.
            if (supportLocalStorage) {
                localStorage[this.name+':'+key] = value;
            }
        }

        var value = this.apply(this, arguments);

        if(Promise.resolve(value) == value) {
            value.then(data => {
                store(key, JSON.stringify(data));
                return this._values[key] = data;
            })

            return value;
        } else {
            var portableValue = JSON.stringify(value);
            store(key, portableValue);

            return this._values[key] = portableValue;
        }

    }
};

// Call the memoization function with the original function arguments.
Function.prototype.memoize = function() {
    var fn = this;
    return function() {
        return fn.memoized.apply(fn, arguments);
    };
};