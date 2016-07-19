'use strict'

var h = require('react').createElement
var MessageOptions = require('./message-options')

module.exports = function MessagePlural (props) {
  return (
    h('span', { className: 'icu-m-arg' },
      '{ ',
      h('span', { className: 'icu-m-argname' }, props.id),
      ', ',
      h('span', { className: 'icu-m-argtype' }, props.type),
      ', ',
      props.offset ? (
        h('span', { className: 'icu-m-argstyle' }, ' offset:', props.offset)
      ) : null,
      h(MessageOptions, { type: props.type, options: props.options }),
      h('br'),
      '}'
    )
  )
}
