import utils from '../utils';
import _ from 'lodash';

let duration = 500;

export default function debounce(target, key, descriptor) {
  let fn = descriptor.value;

  if ( typeof fn !== 'function' ) {
    throw new Error(`@debounce decorator can only be applied to methods not: ${typeof fn}`);
  }

  let className = utils.getClassName(target);
  console.log(`[@debounce] ${className}.${key}() @ ${duration}ms`);


  return {
    configurable: true,
    get() {
      if ( this === target.prototype ) {
        return fn;
      }

      let debouncedFn = _.debounce(fn);
      Object.defineProperty(this, key, {
        value: boundFn,
        configurable: true,
        writable: true
      });
      return boundFn;
    }
  };
}


/**
 * Return a descriptor removing the value and returning a getter
 * The getter will return a .bind version of the function
 * and memoize the result against a symbol on the instance
 */
function boundMethod() {


}
