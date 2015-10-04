import React from 'react'
import { leftSpacePad } from './util'
import Message from './message'

export default function MessageOptions ({ parent, options }) {
  const keys = Object.keys(options)
  const padLength = Math.max(...keys.map(key => key.length))
  return (
    <span>
      { keys.map(key =>
        <span key={ key }>
          <br />
          { '\u00A0\u00A0' }
          <span className='icu-m-argkey'>{ leftSpacePad(key, padLength) }</span>
          { ' {' }
          <Message parent={ parent } className='icu-m-sub' value={ options[key] } />
          { '}' }
        </span>
      ) }
    </span>
  )
}
