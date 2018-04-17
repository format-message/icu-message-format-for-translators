'use strict'

var h = require('react').createElement
var interpret = require('format-message-interpret')
var getParamsFromPatternAst = require('./util').getParamsFromPatternAst

var types = {
  '<>': function (placeholder, locales) {
    var style = placeholder[2]
    return function (value, args) {
      const tagName = value.trim().split(/\s+/)[0]
      const props = typeof style === 'object' ? mapObject(style, args) : style
      return props
        ? ('<' + value.trim() + '>' + (props.children || props) + '</' + tagName + '>')
        : ('<' + value.trim() + '/>')
    }
  }
}

function mapObject (object/* { [string]: (args?: Object) => any } */, args/*: ?Object */) {
  return Object.keys(object).reduce(function (mapped, key) {
    mapped[key] = object[key](args)
    return mapped
  }, {})
}

module.exports = function Params (props) {
  var placeholders = getParamsFromPatternAst(props.ast)
  var args = {}
  placeholders.forEach(function (param) {
    args[param.name] = props.params[param.name]
    if (param.type === 'date') {
      if (args[param.name] && typeof args[param.name] === 'string') {
        var date = new Date(args[param.name])
        args[param.name] = +date + (date.getTimezoneOffset() * 60 * 1000)
      } else {
        args[param.name] = Date.now()
      }
    } else if (param.type === 'time') {
      if (args[param.name] && typeof args[param.name] === 'string') {
        +new Date('2018-01-01 ' + args[param.name])
        args[param.name] = +date + (date.getTimezoneOffset() * 60 * 1000)
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
    final = interpret(props.ast, props.locale, types)(args)
  } catch (e) {
    error = e
    final = e.message
  }

  var inputTypes = {
    number: 'number',
    duration: 'number',
    spellout: 'number',
    select: 'text',
    plural: 'number',
    selectordinal: 'number',
    date: 'date',
    time: 'time',
    '<>': 'text',
    '': 'text'
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
            h('label', { htmlFor: param.name },
              param.name, ' ',
              (param.type || '') in inputTypes
                ? h('span', { className: 'p-type' }, inputTypes[param.type || ''])
                : h('span', { className: 'p-type-unknown' }, 'custom ', param.type)
            ),
            h('input', {
              className: 'u-full-width',
              id: param.name,
              name: param.name,
              onChange: props.onChange,
              placeholder: placeholder,
              type: inputTypes[param.type] || 'text',
              value: props.params[param.name] || ''
            })
          )
        })
      ),
      h('output', {
        className: error ? 'Form-final Form-final-error' : 'Form-final',
        dir: textDir,
        lang: props.locale
      }, final),
      h('div', { className: 'Form-note' },
        'The parsing & preview are done with ',
        h('a', { href: 'https://github.com/format-message/format-message' }, 'format-message'),
        '. Other libraries may give different results, especially for custom types',
        ', styles, and rich tag markup.'
      )
    )
  )
}
