import React from 'react'
import { render } from 'react-dom'
import TryIt from './try-it'

function start() {
  render(<TryIt />, document.getElementById('tryit'))
}

if (typeof Intl !== 'object') {
  require.ensure([ 'intl', 'intl/locale-data/jsonp/en' ], () => {
    require('intl')
    require('intl/locale-data/jsonp/en')
    start()
  }, 'intl')
} else {
  start()
}
