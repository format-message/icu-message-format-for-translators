'use strict'

var h = require('react').createElement
var MessageFormat = require('message-format')
var getParamsFromPatternAst = require('./util').getParamsFromPatternAst

module.exports = function Params (props) {
  var placeholders = getParamsFromPatternAst(props.ast)
  var args = {}
  placeholders.forEach(function (param) {
    args[param.name] = props.params[param.name]
    if (param.type === 'date') {
      if (args[param.name] && typeof args[param.name] === 'string') {
        args[param.name] = +new Date(args[param.name])
      } else {
        args[param.name] = Date.now()
      }
    } else if (param.type === 'time') {
      if (args[param.name] && typeof args[param.name] === 'string') {
        args[param.name] = +new Date('1/1/15 ' + args[param.name])
      } else {
        args[param.name] = Date.now()
      }
    } else if (args[param.name] === '' || args[param.name] == null) {
      args[param.name] = param.name
    }
  })

  var final = ''
  var textDir = 'ltr'
  var rtlLocales = [ 'ar', 'he', 'fa', 'ur', 'ps' ] // list's not exhaustive.

  if (rtlLocales.indexOf(props.locale) != -1){
  	textDir = 'rtl'
  }

  var error
  try {
    final = new MessageFormat(props.locale, props.pattern).format(args)
  } catch (e) {
    error = e
    final = e.message
  }

  var types = {
    number: 'number',
    select: 'text',
    plural: 'number',
    selectordinal: 'number',
    date: 'date',
    time: 'time'
  }

  return (
    h('fieldset', { className: 'Form-params' },
      h('legend', { className: 'Form-params-legend' },
        'Preview final string with values:'
      ),
      h('div', null,
        placeholders.map(function (param) {
          var placeholder = param.name
          if (param.type === 'date') {
            placeholder = new Date().toDateString()
          } else if (param.type === 'time') {
            placeholder = new Date().toTimeString()
          }
          return h('div', { key: param.name, className: 'p-value' },
            h('label', { htmlFor: param.name }, param.name),
            h('input', {
              className: 'u-full-width',
              id: param.name,
              name: param.name,
              onChange: props.onChange,
              placeholder: placeholder,
              type: types[param.type] || 'text',
              value: props.params[param.name] || ''
            })
          )
        })
      ),
      h('output', {
        className: error ? 'Form-final Form-final-error' : 'Form-final',
        dir: textDir,
        lang: props.locale
      }, final)
    )
  )
}
