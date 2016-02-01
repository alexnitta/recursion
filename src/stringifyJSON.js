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

  var innerFunc = function (obj, objKeys) { // inner function to be run if value is a collection
    var result = '';
    
    if (Array.isArray(obj)) { // if collection is an array,
      var objArr = obj.slice(); // copy the obj      
      if (obj === value) { // if collection is the original value 
        result ='['; // add the open brace
      } else { // if collection is not original value,
        if (objArr.length === 0) { 
          return ']'; 
        } 
        // if (objArr.length > 1) { 
          result = ','; 
        // }
        // if (objArr.length === 1) {
        //   result += '[';
        // }
      }
      
      var arrayValue = objArr.shift(); // remove the first element of the array  
      
      if (primitiveChecker(arrayValue)) { // if the first element is a primitive,
          result += primitiveChecker(arrayValue); // append the appropriate string
      } else { // otherwise,
        console.log('arrayValue: ' + JSON.stringify(arrayValue) + ' -- ran innerFunc(arrayValue)');
        if (Array.isArray(arrayValue) && arrayValue.length === 0) {
          result += '[]';
        } else if (Object.keys(arrayValue).length === 0) {
          result += '{}';
        }
        result += innerFunc(arrayValue); // recursive case: if first element is a non-empty collection, recurse
      }   
      
      return result + innerFunc(objArr);
      
    } else { // if collection is not an array, it is an object
      if (objKeys === undefined) { // keys haven't been loaded, either first pass, or processing a value of type object
        objKeys = Object.keys(obj);
        result = '{';
      } else {  
        if (objKeys.length === 0) { // if keys array exists and is empty, no more properties to evaluate,
            return '}'; // so return the end bracket
        } else { // if keys array exists and isn't empty, that means it's a property and not the first property
          result = ','; // so add a comma    
        }
      }
      
      result += '"' + objKeys[0] + '":'; // add the property name
      var objValue = obj[objKeys[0]]; // get the value

      if (primitiveChecker(objValue)) { // if the current value is a primitive,
          result += primitiveChecker(objValue); // append the appropriate string
      } else { // otherwise,
        result += innerFunc(objValue); // recursive case: if current value is a non-empty collection, recurse
      }  

      objKeys.splice(0,1);
      //call the function for the next property
      return result + innerFunc(obj, objKeys);
    };
  }
  
return innerFunc(value);
};
