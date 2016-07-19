'use strict'

var h = require('react').createElement
var MessageText = require('./message-text')

module.exports = function MessageArg (props) {
  return (
    h('span', { className: 'icu-m-arg' },
      '{ ',
      h('span', { className: 'icu-m-argname' }, props.id),
      props.type && ', ',
      props.type && h('span', { className: 'icu-m-argtype' }, props.type),
      props.style && ', ',
      props.style && (
        h('span', { className: 'icu-m-argstyle' },
          h(MessageText, { value: props.style })
        )
      ),
      ' }'
    )
  )
}
