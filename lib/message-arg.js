import React from 'react'
import MessageText from './message-text'

export default function MessageArg ({ id, type, style }) {
  return (
    <span className='icu-m-arg'>
      { '{ ' }
      <span className='icu-m-argname'>{ id }</span>
      { type && ', ' }
      { type && <span className='icu-m-argtype'>{ type }</span> }
      { style && ', ' }
      { style && (
        <span className='icu-m-argstyle'>
          <MessageText value={ style } />
        </span>
      ) }
      { ' }' }
    </span>
  )
}
