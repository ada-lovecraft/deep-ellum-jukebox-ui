import utils from '../utils';

export default function autobind(...args) {
  console.log('[@autobind] args:', ...args);
  if ( args.length === 1 ) {
    return boundClass(...args);
  } else {
    return boundMethod(...args);
  }
}

/**
 * Use boundMethod to bind all methods on the target.prototype
 */
function boundClass(target) {
  // (Using reflect to get all keys including symbols)
  let keys = Object.getOwnPropertyNames(target.prototype);
  keys.forEach(key => {
    // Ignore special case target method
    if ( key === 'constructor' ) {
      return;
    }

    let descriptor = Object.getOwnPropertyDescriptor(target.prototype, key);

    // Only methods need binding
    if ( typeof descriptor.value === 'function' ) {
      Object.defineProperty(target.prototype, key, boundMethod(target, key, descriptor));
    }
  });
  return target;
}

/**
 * Return a descriptor removing the value and returning a getter
 * The getter will return a .bind version of the function
 * and memoize the result against a symbol on the instance
 */
function boundMethod(target, key, descriptor) {

  let fn = descriptor.value;
  if ( typeof fn !== 'function' ) {
    throw new Error(`@autobind decorator can only be applied to methods not: ${typeof fn}`);
  }

  return {
    configurable: true,
    get() {
      if ( this === target.prototype ) {
        return fn;
      }

      let boundFn = fn.bind(target);
      Object.defineProperty(target, key, {
        value: boundFn,
        configurable: true,
        writable: true
      });
      return boundFn;
    }
  };
}
