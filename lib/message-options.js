'use strict'

var h = require('react').createElement
var leftSpacePad = require('./util').leftSpacePad
var Message = require('./message')

module.exports = function MessageOptions (props) {
  var keys = Object.keys(props.options)
  var padLength = Math.max.apply(Math, keys.map(function (key) { return key.length }))
  return (
    h('span', null,
      keys.map(function (key) {
        return h('span', { key: key },
          h('br'),
          '\u00A0\u00A0',
          h('span', { className: 'icu-m-argkey' }, leftSpacePad(key, padLength)),
          ' {',
          h(Message.Sub, {
            parent: props.parent,
            className: 'icu-m-sub',
            value: props.options[key]
          }),
          '}'
        )
      })
    )
  )
}
