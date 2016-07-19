'use strict'

var h = require('react').createElement

module.exports = function MessageText (props) {
  var special = props.parent === 'plural' ? /[{}#]+/g : /[{}]+/g
  var text = props.value
    .replace(/'/g, "''") // double apostrophe
    .replace(special, "'$&'") // escape syntax
  return h('span', null, text)
}
