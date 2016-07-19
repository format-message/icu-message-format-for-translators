'use strict'

var h = require('react').createElement
var MessageFormat = require('message-format')
var getParamsFromPatternAst = require('./util').getParamsFromPatternAst

module.exports = function Params (props) {
  var placeholders = getParamsFromPatternAst(props.ast)
  var args = {}
  placeholders.forEach(function (param) {
    args[param.name] = props.params[param.name] || ''
    if (param.type === 'date') {
      if (typeof args[param.name] === 'string') {
        // yyyy-MM-dd is interpreted as UTC date
        // yyyy/MM/dd is interpreted as local date
        args[param.name] = args[param.name].replace(/-/g, '/')
      }
      args[param.name] = +new Date(args[param.name])
    } else if (param.type === 'time') {
      args[param.name] = +new Date('1/1/15 ' + args[param.name])
    }
  })

  var final = ''
  var textDir = 'ltr'
  var rtlLocales = [ 'ar', 'he', 'fa', 'ur', 'ps' ] // list's not exhaustive.

  if (rtlLocales.indexOf(props.locale) != -1){
  	textDir = 'rtl'
  }

  try { final = new MessageFormat(props.pattern, props.locale).format(args) }
  catch (e) { final = e.message }

  var types = {
    number: 'number',
    select: 'text',
    plural: 'number',
    selectordinal: 'number',
    date: 'date',
    time: 'time'
  }

  return (
    h('fieldset', { className: 'TryIt-params' },
      h('legend', { className: 'TryIt-params-legend' },
        'Preview final string with parameters:'
      ),
      h('div', { className: 'p-table' },
        placeholders.map(function (param) {
          return h('label', { key: param.name, className: 'p-row' },
            h('span', { className: 'p-cell' }, param.name),
            h('span', { className: 'p-cell' },
              h('input', {
                className: 'p-cell',
                type: types[param.type] || 'text',
                name: param.name,
                value: props.params[param.name] || '',
                onChange: props.onChange
              })
            )
          )
        })
      ),
      h('span', { className: 'TryIt-final', dir: textDir }, final)
    )
  )
}
