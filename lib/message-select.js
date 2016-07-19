'use strict'

var h = require('react').createElement
var MessageOptions = require('./message-options')

module.exports = function MessageSelect (props) {
  return (
    h('span', { className: 'icu-m-arg' },
      '{ ',
      h('span', { className: 'icu-m-argname' }, props.id),
      ', ',
      h('span', { className: 'icu-m-argtype' }, 'select'),
      ', ',
      h(MessageOptions, { type: 'select', options: props.options }),
      h('br'),
      '}'
    )
  )
}
