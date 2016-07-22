'use strict'

var h = require('react').createElement

module.exports = function TokenArea (props) {
  return h('code', { className: 'icu-m ' + props.className },
    props.tokens.map(function (token) {
      if (token[0] === 'text') {
        return token[1]
      }
      var className = 'icu-m-'
      switch (token[0]) {
        case 'id': className += 'argname'; break
        case 'type': className += 'argtype'; break
        case 'style': className += 'argstyle'; break
        case '#': className += 'arghash'; break
        case 'selector': className += 'argkey'; break
        default: className += 'arg'; break
      }
      return h('span', { className: className }, token[1])
    }),
    props.error &&
      h('span', {
        className: 'icu-m-unknown p-tooltip p-tooltip-always',
        'data-tooltip': props.error.message
      },
        props.pattern.slice(props.lastIndex)
      )
  )
}
