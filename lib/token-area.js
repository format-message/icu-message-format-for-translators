'use strict'

var h = require('react').createElement

module.exports = function TokenArea (props) {
  return h('code', { className: 'icu-m ' + props.className },
    props.tokens.map(function (token, i) {
      if (token[0] === 'text' || token[0] === 'space') {
        return token[1]
      }
      var className = 'icu-m-'
      switch (token[0]) {
        case 'id': className += 'argname'; break
        case 'type': className += 'argtype'; break
        case 'style': className += 'argstyle'; break
        case 'selector': className += 'argkey'; break
        case 'syntax': className += token[1] === '#' ? 'arghash' : 'arg'; break
        default: className += 'arg'; break
      }
      return h('span', { key: i, className: className }, token[1])
    }),
    props.error &&
      h('span', {
        className: 'icu-m-unknown p-tooltip p-tooltip-always',
        'data-tooltip': props.error.message
      },
        props.pattern.slice(props.error.offset)
      )
  )
}
