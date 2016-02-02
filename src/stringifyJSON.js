// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function (value) {
  
  var primitiveChecker = function(item) { // returns a string if item is a primitive or false if the item is an array or object
    if (typeof(item) === 'undefined') {
      return '';
    } else if (typeof(item) === 'function') {
      return '';
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
    } 
    else {
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

  var innerFunc = function (obj, size, index) { // inner function to be run if value is a collection with contents
    var result = '';

    if (Array.isArray(obj)) {  // begin array version
      if (size === undefined) {
        result = ']'; // start with closing bracket
        size = obj.length; // if size is undefined, set it to length of obj
      }    
      if (index === undefined) {
        index = obj.length-1; // if index is undefined, set it to 
      }
    
      if (size > 0) { // recursive case: if object is not empty,                
        if (primitiveChecker(obj[index])) { // if the element is a primitive,
          result = primitiveChecker(obj[index]) + result; // prepend the index and appropriate string, with punctuation          
          if (size > 1) {
            result = ',' + result; // if this is not the first element, prepend a comma
          }
          result = innerFunc(obj, size - 1, index - 1) + result;
        } else { // if the element is a collection,         
          if (size > 1 && !Array.isArray(obj)) { // if it has contents, is not an array, and this is not the first element,
            result = ',' + result; //  prepend a comma
          }  
          result = innerFunc(obj[index]) + result; // recurse
          if (index > 0) {
            result = ',' + result;
          }
          if (index > -1) {
            result = innerFunc(obj, size - 1, index - 1) + result;
          }
        }
      // end of recursive case  
      } else { // base case: if there are no more elements,
        result = '[' + result; // append open brace    
      }               
      return result;  
      // end of array version
      
    } else { // begin object version
            
      if (size === undefined) {
        result = '}'; // start with closing brace
        size = Object.keys(obj).length; // if size is undefined, set it to length of obj
      }    
      if (index === undefined) {
        index = Object.keys(obj).length-1;
      }
      
      var key = Object.keys(obj)[index];
    
      if (size > 0) { // recursive case: if object is not empty,
      
        if (typeof(obj[key]) === 'undefined' || typeof(obj[key]) === 'function') { // if the value is undefined or a function, skip it
          result = '{}';
        } else if (primitiveChecker(obj[key])) { // if the element is a primitive,
          result = '"' + key + '":' + primitiveChecker(obj[key]) + result; // prepend the key and appropriate string, with punctuation          
          if (size > 1) {
            result = ',' + result; // if this is not the first element, prepend a comma
          }
          result = innerFunc(obj, size - 1, index - 1) + result;
        } else { // if the element is a collection,         
          if (size > 1 && Object.keys(obj) === undefined) { // if it has contents, is not an object, and this is not the first element,
            result = ',' + result; // prepend a comma
          }  
          result = '"' + key + '":' + innerFunc(obj[key]) + result; // recurse
          if (index > 0) {
            result = ',' + result;
          }
          if (index > -1) {
            result = innerFunc(obj, size - 1, index - 1) + result;
          }
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
