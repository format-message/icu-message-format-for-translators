import React from 'react'
import MessageOptions from './message-options'

export default function MessageSelect ({ id, options }) {
  return (
    <span className='icu-m-arg'>
      { '{ ' }
      <span className='icu-m-argname'>{ id }</span>
      { ', ' }
      <span className='icu-m-argtype'>select</span>
      { ', ' }
      <MessageOptions type='select' options={ options } />
      <br />
      { '}' }
    </span>
  )
}
