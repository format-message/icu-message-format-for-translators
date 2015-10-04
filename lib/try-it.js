import React from 'react'
import Parser from 'message-format/parser'
import Message from './message'
import Params from './params'

export default class TryIt extends React.Component {
  displayName = 'TryIt'

  state = {
    pattern: 'Hello, {firstName} {lastName}!',
    params: {}
  }

  didChangePattern (evt) {
    this.setState({ pattern: evt.target.value })
  }

  didChangeParam (evt) {
    this.setState({ params: {
      ...this.state.params,
      [evt.target.name]: evt.target.value
    } })
  }

  render () {
    const { pattern, params } = this.state
    let ast
    let error

    try {
      ast = Parser.parse(pattern)
    } catch (e) {
      error = e.message.replace(' in ' + pattern, '')
    }

    return (
      <div className='TryIt'>
        <textarea
          className='TryIt-text icu-m'
          value={ pattern }
          onChange={ evt => this.didChangePattern(evt) }
        />
        {
          !error
          && <Message className='TryIt-message icu-m' value={ ast || pattern } />
        }
        {
          error
          && <div className='TryIt-error icu-m icu-m--bad'>{ error }</div>
        }
        {
          ast
          && <Params
            pattern={ pattern }
            ast={ ast }
            params={ params }
            onChange={ evt => this.didChangeParam(evt) }
          />
        }
      </div>
    )
  }
}
