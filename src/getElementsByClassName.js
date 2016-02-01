// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function (className, nodeArr, resultArr) {
  nodeArr = nodeArr || ( // if nodeList is undefined, set it to all nodes in body
    (function (nodes) {
      var arr = [];
      for (var i = 0; i < nodes.length; i++) {
        arr.push(nodes[i]);
      }
      return arr;
    })(document.body.childNodes);
  ); 
  
  resultArr = resultArr || []; // if resultArr is undefined, set it to empty array
  
  if (nodeArr[0].classList !== undefined && nodeArr[0].classList.item(0) !== null) {
    for (var j = 0; j < nodeArr[0].classList.length; j++) {
      resultArr.push(nodeArr[0].classList.item(j));
    }
  }

  nodeArr.shift();
  
  getElementsByClassName(className,nodeArr,resultArr);
  
}
