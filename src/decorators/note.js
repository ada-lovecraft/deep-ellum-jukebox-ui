import isFunction from 'lodash/lang/isFunction';
import forOwn from 'lodash/object/forOwn';
import bind from 'lodash/function/bind';

export default function noteWrapper(...args) {
  return function noteDecorator(...properties) {
    return noteMethod(...properties, ...args);
  };
}

function noteMethod(target, name, descriptor, ...args) {
  const {value, get, writable} = descriptor;

  return {
    configurable: true,
    // allows the user to reassign the variable
    set(value) {
      console.log('[@note set]:', ...args);
      Object.defineProperty(this, name, {
        configurable: true,
        value,
        writable
      });
    },
    get() {
      console.log('[@note get]:', ...args);
      let thisValue = value;
      if ( isFunction(get) ) {
        thisValue = get.call(this)
      }

      let boundValue = thisValue;

      if ( isFunction(thisValue) ) {
        boundValue = bind(thisValue, this);
        copyMetaData(thisValue, boundValue);
      }

      Object.defineProperty(this, name, {
        writable,
        configurable: true,
        value: boundValue
      });

      return boundValue;
    }
  }
}

function copyMetaData(to, from) {
  forOwn(from, (value, key) => to[ key ] = value);
  return to;
}
