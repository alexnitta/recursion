// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function (value) {
  
  var primitiveChecker = function(item) { // returns a string if item is a primitive or false if the item is an array or object
    if (typeof(item) === 'undefined') {
      return 'undefined';
    } else if (typeof(item) === 'function') {
      return 'function';
    } else if (item === null) {
      return 'null';
    } else if (item === true) {
      return 'true';
    } else if (item === false) {
      return 'false';
    } else if(typeof(item) === 'number') {
      return item.toString();
    } else if (typeof(item) === 'string') {
      return '"' + item + '"';
    } else {
      return false;
    }
  };
  
  if (primitiveChecker(value)) { // if the value is a primitive,
    return primitiveChecker(value); // return appropriate string
  }
  
  if (!primitiveChecker(value)) { // termination cases:
    if (Array.isArray(value) && value.length === 0) { // if obj is an empty array,
      return '[]'; // return brackets
    } else if (Object.keys(value).length === 0) { // if obj is an empty object,
      return '{}'; // return braces
    }
  }

// if this point has been reached, value is a collection

  var innerFunc = function (obj, size) { // inner function to be run if value is a collection with contents
    var result = '';
    
    if (Array.isArray(obj)) { // if collection is an array,
      // begin array version
      if (size === undefined) {
        result = ']'; // start with closing bracket
        size = obj.length; // if size is undefined, set it to length of obj
      }      
      
      if (size > 0) { // recursive case: if object is not empty,                
        var key = size-1;
        if (primitiveChecker(obj[key])) { // if the element is a primitive,
          result = primitiveChecker(obj[key]) + result; // prepend the key and appropriate string, with punctuation          
          if (size > 1) {
            result = ',' + result; // if this is not the first element, prepend a comma
          }
          result = innerFunc(obj, size - 1) + result;
        } else { // if the element is a collection,         
          if (size > 1) {
            result = ',' + result; // if this is not the first element, prepend a comma
          }
          result = '[' + innerFunc(obj[key]) + result; // recurse
        }
      // end of recursive case  
      } else { // base case: if there are no more elements,
        result = '[' + result; // append open bracket     
      }               
      return result;  
      // end of array version
      
    } else { // if collection is not an array, it is an object
      // begin object version
      if (size === undefined) {
        result = '}'; // start with closing brace
        size = Object.keys(obj).length; // if size is undefined, set it to length of obj
      }      
      
      if (size > 0) { // recursive case: if object is not empty,                
        var key = Object.keys(obj)[size-1];
        if (primitiveChecker(obj[key])) { // if the element is a primitive,
          result = '"' + key + '":' + primitiveChecker(obj[key]) + result; // prepend the key and appropriate string, with punctuation          
          if (size > 1) {
            result = ',' + result; // if this is not the first element, prepend a comma
          }
          result = innerFunc(obj, size - 1) + result;
        } else { // if the element is a collection,         
          if (size > 1) {
            result = ',' + result; // if this is not the first element, prepend a comma
          }
          result = '{"' + key + '":' + innerFunc(obj[key]) + result; // recurse
        }
      // end of recursive case  
      } else { // base case: if there are no more elements,
        result = '{' + result; // append open brace      
      }               
      return result;  
      // end of object version
    }
  }; // end of innerFunc
  
return innerFunc(value);
}; // end of stringifyJSON function
