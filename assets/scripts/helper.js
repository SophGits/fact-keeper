// +function(){
// }();

"use strict"

function addClass( element, classToAdd ) {
  if( element.className.indexOf(classToAdd) >= 0 ) {
    return element;
  }
  element.className = element.className + classToAdd;
  return element;
}
function removeClass( element, classToRemove ) {
  if( element.className.indexOf(classToRemove) < 0 ) {
    return element;
  }
  element.className = element.className.split(' ').filter(function( className ) {
    className != classToRemove;
  }).join(' ');
  return element;
}
