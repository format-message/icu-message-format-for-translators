import React from 'react'

export default function MessageText ({ value, parent }) {
  var special = parent === 'plural' ? /[{}#]+/g : /[{}]+/g
  var text = value
    .replace(/'/g, "''") // double apostrophe
    .replace(special, "'$&'") // escape syntax
  return <span>{ text }</span>
}
