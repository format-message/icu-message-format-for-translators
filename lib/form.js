'use strict'

var h = require('react').createElement
var createClass = require('react').createClass
var parse = require('format-message-parse')
var TokenArea = require('./token-area')
var Params = require('./params')
var tokens = require('format-message-parse/tokens')

module.exports = createClass({
  displayName: 'Form',

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
    var result = tokens(pattern)
    var error = result.error
    var ast

    try {
      ast = parse(pattern)
    } catch (e) {
    }

    return (
      h('form', { className: 'Form' },
        h('label', { htmlFor: 'pattern' }, 'Message'),
        h('div', { className: 'Form-pattern' },
          h('textarea', {
            className: 'Form-text',
            id: 'pattern',
            name: 'pattern',
            onChange: this.didChangePattern,
            value: pattern
          }),
          h(TokenArea, {
            className: 'Form-message',
            error: result.error,
            lastIndex: result.lastIndex,
            pattern: pattern,
            tokens: result.tokens
          })
        ),
        h('label', { htmlFor: 'locale' },
          'Language',
          h('span', {
            className: 'p-tooltip',
            'data-tooltip': 'IETF Language Tag'
          },
            h('a', {
              className: 'button button-primary help-button',
              href: 'http://www.i18nguy.com/unicode/language-identifiers.html',
              target: '_blank'
            }, '?')
          )
        ),
        h('input', {
          className: 'p-value',
          id: 'locale',
          name: 'locale',
          onChange: this.didChangeLocale,
          type: 'text',
          value: locale
        }),
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
