'use strict'

var h = require('react').createElement
var MessageText = require('./message-text')
var MessagePlural = require('./message-plural')
var MessageSelect = require('./message-select')
var MessageArg = require('./message-arg')

exports.Sub = module.exports = function Message (props) {
  return (
    h('span', { className: props.className },
      (props.value || []).map(function (element, i) {
        if (typeof element === 'string') {
          return h(MessageText, { key: i, value: element, parent: props.parent })
        }
        if (element[0] === '#') {
          return h('span', { key: i, className: 'icu-m-arg' }, '#')
        }

        var id = element[0]
        var type = element[1]
        var arg1 = element[2]
        var arg2 = element[3]
        switch (type) {
          case 'plural':
          case 'selectordinal':
            return h(MessagePlural, { key: i, id: id, type: type, offset: arg1, options: arg2 })
          case 'select':
            return h(MessageSelect, { key: i, id: id, options: arg1 })
          default:
            return h(MessageArg, { key: i, id: id, type: type, style: arg1 })
        }
      })
    )
  )
}
