// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  
  var stringifyObj = function (arg) { // use this inner function on objects only
    var result = '';
    var keys = Object.keys(arg); // set var keys to array containing the keys of the supplied object
    var position = keys.length-1;  // position is the index of the current key in keys var
    
    (function looper(obj2) { // IIFE that uses recursion
      if (position < 0 ) {
        result = '{' + result + '}'; // base case - if all properties have been logged (or there are no properties), 
        return result; // wrap result in curly braces and return result
      } else { // recursive case
        result = '"' + keys[position] + '":' + obj2[keys[position]] + result; // wrap key and value in appropriate
        // punctuation and prepend to result 
        if (position > 0) { // if the key:value pair is in any position other than first, prepend a comma to result
          result = ',' + result;
        }
        position --; // decrement the position
      } 
      looper(obj2); // call IIFE on itself
    })(arg); // feed arg to IIFE
    
    return result;
  };
  
  var stringifyArr = function(arg) { // use this inner function on arrays only
    var result = '';
    var arrCopy = arg.slice();
    
    (function looper2(input) { // IIFE that uses recursion

      if (input.length === 0) { // base case: once input is empty, 
        result = '[' + result + ']'; // wrap result in brackets and return it
        return result;
      } else { // recursive case
        var item = input.pop();
        if (typeof(item) === 'string') {
          item = '"' + item + '"';
        }
        result = item + result; // prepend current item to result
        if (input.length > 0) {
          result = ',' + result; // if the item is in any position other than first, prepend a comma to result
        }
      }
          
      looper2(input); // call the IIFE on itself
    
    })(arrCopy); // feed arg to IIFE
    
    return result;
      
  };
  
  if (typeof(obj) === 'undefined') {
    console.log('Error! Input must not be undefined.');
    return;
  } else if (typeof(obj) === 'function') {
    console.log('Error! Input must not be a function.');
    return;
  } else if (obj === null) {
    return 'null';
  } else if (obj === true) {
    return 'true';
  } else if (obj === false) {
    return 'false';
  } else if(typeof(obj) === 'number') {
    return obj.toString();
  } else if (typeof(obj) === 'string') {
    return '"' + obj  + '"';
  } else if (Array.isArray(obj)) {
    return stringifyArr(obj);
  } else if (typeof(obj) === 'object') {
  return stringifyObj(obj);
  }
  
};
