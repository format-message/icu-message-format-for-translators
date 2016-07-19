'use strict'

var h = require('react').createElement
var createClass = require('react').createClass
var parse = require('format-message-parse')
var Message = require('./message')
var Params = require('./params')

module.exports = createClass({
  displayName: 'TryIt',

  didChangePattern: function (evt) {
    this.props.onChangePattern(evt.target.value)
  },

  didChangeParam: function (evt) {
    this.props.onChangeParam(evt.target.name, evt.target.value)
  },

  didChangeLocale: function (evt) {
    this.props.onChangeLocale(evt.target.value)
  },

  render: function () {
    var pattern = this.props.pattern
    var params = this.props.params
    var locale = this.props.locale
    var ast
    var error

    try {
      ast = parse(pattern)
    } catch (e) {
      error = e.message.replace(' in ' + pattern, '')
    }

    return (
      h('div', { className: 'TryIt' },
        h('div', { className: 'p-table' },
          h('label', { key: 'locale', className: 'p-row' },
            h('span', { className: 'p-cell' }, 'Language code'),
            h('span', { className: 'p-cell' },
              h('input', {
                type: 'text',
                name: 'locale',
                value: locale,
                onChange: this.didChangeLocale
              })
            ),
            h('span', {
              className: 'p-tooltip p-tooltip-right',
              'data-tooltip': 'Shortest ISO 639 code'
            },
              h('a', {
                href: 'http://www-01.sil.org/iso639-3/codes.asp?order=639_2&letter=%25'
              }, '?')
            )
          )
        ),
        h('textarea', {
          className: 'TryIt-text icu-m',
          value: pattern,
          onChange: this.didChangePattern
        }),
        error
          ? h('div', { className: 'TryIt-error icu-m icu-m--bad' }, error)
          : h(Message, { className: 'TryIt-message icu-m', value: ast || pattern }),
        ast && h(Params, {
          pattern: pattern,
          ast: ast,
          params: params,
          locale: locale,
          onChange: this.didChangeParam
        })
      )
    )
  }
})
