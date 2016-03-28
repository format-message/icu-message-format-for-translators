import React from 'react'
import Parser from 'message-format/parser'
import Message from './message'
import Params from './params'

export default class TryIt extends React.Component {
  displayName = 'TryIt'

  state = {
    pattern: 'Hello, {firstName} {lastName}!',
    params: {},
    locale: 'en'
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
  
  didChangeLocale (evt) {
  	this.setState( { locale: evt.target.value } )
  }

  render () {
    const { pattern, params, locale } = this.state
    let ast
    let error

    try {
      ast = Parser.parse(pattern)
    } catch (e) {
      error = e.message.replace(' in ' + pattern, '')
    }

    return (
      <div className='TryIt'>
      	<div className='p-table'>
		<label key='locale' className='p-row'>
            <span className='p-cell'>Language code</span>
            <span className='p-cell'>
			<input
                type='text'
                name='locale'
                value={ locale }
                onChange={ evt => this.didChangeLocale(evt) }
              />
            </span>
            <span className='p-tooltip p-tooltip-right' data-tooltip='Shortest ISO 639 code'>
	            <a href="http://www-01.sil.org/iso639-3/codes.asp?order=639_2&letter=%25">?</a>
            </span>
        </label>
        </div>
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
            locale={ locale }
            onChange={ evt => this.didChangeParam(evt) }
          />
        }
      </div>
    )
  }
}
