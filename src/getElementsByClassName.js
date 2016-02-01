// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function (className) {
  
  if (document.body === null) { // if document has no body, return null
    return null;
  }
  
  var innerFunc = function (className1, node, resultArr) {  
    node = node || document.body; // if node is undefined, set it to document body
    resultArr = resultArr || []; // if resultArr is undefined, set it to empty array
    
    if (node.classList !== undefined) {  // if this node has any classes,
      var matchClass = false;      
      for (var k = 0; k < node.classList.length; k++) { // check all its classes against className1
        if (className1 === node.classList[k]) {
          matchClass = true;
        }
      } 
      if (matchClass) { // if any class matches,
        resultArr.push(node) // push node to resultArr
      };
    }
    
    if (node.hasChildNodes()) { // if this node has children
      var child = node.firstChild; // start with the firstChild
      while (child) { // as long as there is a child to work on,
        if (child.nodeType === 1) { // if they are an element,
          innerFunc(className1,child,resultArr); // recursive case: run innerFunc on the child
        }
        child = child.nextSibling; // when done with this child, move on to the next one
      }
    }
    
    return resultArr; // when all children have been recursed, return resultArr     
  };
  
  return innerFunc(className);  // invoke inner function on supplied className
};


