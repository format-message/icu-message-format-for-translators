'use strict'

var h = require('react').createElement
var render = require('react-dom').render
var TryIt = require('./try-it')
var createStore = require('redux').createStore

var store = createStore(function (state, action) {
  if (!state) {
    state = {
      pattern: 'Hello, {firstName} {lastName}!',
      params: {},
      locale: 'en'
    }
  }
  switch (action.type) {
    case 'CHANGE_PATTERN':
      return {
        pattern: action.pattern,
        params: state.params,
        locale: state.locale
      }
    case 'CHANGE_PARAM':
      var params = Object.keys(state.params)
        .reduce(function (params, key) {
          params[key] = state.params[key]
          return params
        }, {})
      params[action.name] = action.value
      return {
        pattern: state.pattern,
        params: params,
        locale: state.locale
      }
    case 'CHANGE_LOCALE':
      return {
        pattern: state.pattern,
        params: state.params,
        locale: action.locale
      }
    default:
      return state
  }
})

function changePattern (pattern) {
  store.dispatch({ type: 'CHANGE_PATTERN', pattern: pattern })
}

function changeParam (name, value) {
  store.dispatch({ type: 'CHANGE_PARAM', name: name, value: value })
}

function changeLocale (locale) {
  store.dispatch({ type: 'CHANGE_LOCALE', locale: locale })
}

store.subscribe(function () {
  var state = store.getState()
  render(h(TryIt, {
    pattern: state.pattern,
    params: state.params,
    locale: state.locale,
    onChangePattern: changePattern,
    onChangeParam: changeParam,
    onChangeLocale: changeLocale
  }), document.getElementById('tryit'))
})

changeLocale('en')
