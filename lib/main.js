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
      locale: query.l || 'en',
      isRich: true
    }
  }
  switch (action.type) {
    case 'CHANGE_PATTERN':
      return {
        pattern: action.pattern,
        params: state.params,
        locale: state.locale,
        isRich: state.isRich
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
        locale: state.locale,
        isRich: state.isRich
      }
    case 'CHANGE_LOCALE':
      return {
        pattern: state.pattern,
        params: state.params,
        locale: action.locale,
        isRich: state.isRich
      }
    case 'CHANGE_IS_RICH':
      return {
        pattern: state.pattern,
        params: state.params,
        locale: state.locale,
        isRich: action.isRich
      }
    default:
      return state
  }
})

function changePattern (evt) {
  store.dispatch({ type: 'CHANGE_PATTERN', pattern: evt.target.value })
}

function changeParam (evt) {
  store.dispatch({ type: 'CHANGE_PARAM', name: evt.target.name, value: evt.target.value })
}

function changeLocale (evt) {
  store.dispatch({ type: 'CHANGE_LOCALE', locale: evt.target.value })
}

function changeIsRich (evt) {
  store.dispatch({ type: 'CHANGE_IS_RICH', isRich: evt.target.checked })
}

function draw () {
  var state = store.getState()
  render(h(Form, {
    pattern: state.pattern,
    params: state.params,
    locale: state.locale,
    isRich: state.isRich,
    onChangePattern: changePattern,
    onChangeParam: changeParam,
    onChangeLocale: changeLocale,
    onChangeIsRich: changeIsRich
  }), document.getElementById('editor'))
}

store.subscribe(draw)
draw()
