'use strict'

var h = require('react').createElement
var render = require('react-dom').render
var Form = require('./form')
var createStore = require('redux').createStore
var query = location.search
  .slice(1).split('&')
  .reduce(function (query, param) {
    var parts = param.split('=')
    query[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]) || true
    return query
  }, {})

var store = createStore(function (state, action) {
  if (!state) {
    state = {
      pattern: query.m || 'Hello, {firstName} {lastName}!',
      params: query,
      locale: query.l || 'en'
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

function draw () {
  var state = store.getState()
  render(h(Form, {
    pattern: state.pattern,
    params: state.params,
    locale: state.locale,
    onChangePattern: changePattern,
    onChangeParam: changeParam,
    onChangeLocale: changeLocale
  }), document.getElementById('editor'))
}

store.subscribe(draw)
draw()
