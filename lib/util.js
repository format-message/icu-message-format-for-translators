'use strict'

exports.leftSpacePad = function leftSpacePad (string, count) {
  var padding = ''
  for (var i = string.length; i < count; ++i) {
    padding += ' '
  }
  return padding + string
}

exports.getParamsFromPatternAst = function getParamsFromPatternAst (ast) {
  if (!ast || !ast.slice) return []
  var stack = ast.slice()
  var params = []
  var used = new Set()
  while (stack.length) {
    var element = stack.pop()
    if (typeof element === 'string') continue
    if (element.length === 1 && element[0] === '#') continue

    var name = element[0]
    var type = element[1]
    if (!used.has(name)) params.push({ name: name, type: type })
    used.add(name)
    var children = element[3] || element[2]
    if (typeof children === 'object') {
      stack = stack.concat.apply(stack,
        Object.keys(children).map(function (key) { return children[key] })
      )
    }
  }
  return params.reverse()
}
