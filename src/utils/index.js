class Utils {
  getClassName(target) {
    if ( target.prototype ) {
      return target.prototype.constructor.name;
    } else {
      return target.constructor.name;
    }
  }
}

export default new Utils();
