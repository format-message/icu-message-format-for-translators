import React from 'react'
import MessageOptions from './message-options'

export default function MessagePlural ({ id, type, offset, options }) {
  return (
    <span className='icu-m-arg'>
      { '{ ' }
      <span className='icu-m-argname'>{ id }</span>
      { ', ' }
      <span className='icu-m-argtype'>{ type }</span>
      { ', ' }
      { offset ? ' ' : null }
      { offset ? (
        <span className='icu-m-argstyle'>offset:{ offset }</span>
      ) : null }
      <MessageOptions type={ type } options={ options } />
      <br />
      { '}' }
    </span>
  )
}
