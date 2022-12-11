function isEqual(a: any, b: any): boolean {
    const keys1 = Object.keys(a);
    const keys2 = Object.keys(b);
    if (keys1.length !== keys2.length) {
      return false;
    }
    for (const key of keys1) {
      const val1 = a[key];
      const val2 = b[key];
      const areObjects = isObject(val1) && isObject(val2);
      if (
        areObjects && !isEqual(val1, val2) ||
        !areObjects && val1 !== val2
      ) {
        return false;
      }
    }
    return true;
  }
  function isObject(object: any) {
    return object != null && typeof object === 'object';
  }
  
  
  
  export default isEqual
  
  const a = {a: 1};
  const b = {a: 1};
  isEqual(a, b); // true
