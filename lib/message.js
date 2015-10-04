import React from 'react'
import MessageText from './message-text'
import MessagePlural from './message-plural'
import MessageSelect from './message-select'
import MessageArg from './message-arg'

export default function Message ({ className, value, parent }) {
  return (
    <span className={ className }>
      { (value || []).map((element, i) => {
        if (typeof element === 'string') {
          return <MessageText key={ i } value={ element } parent={ parent } />
        }
        if (element[0] === '#') {
          return <span key={ i } className='icu-m-arg'>#</span>
        }

        const [ id, type, arg1, arg2 ] = element
        switch (type) {
          case 'plural':
          case 'selectordinal':
            return <MessagePlural key={ i } id={ id } type={ type } offset={ arg1 } options={ arg2 } />
          case 'select':
            return <MessageSelect key={ i } id={ id } options={ arg1 } />
          default:
            return <MessageArg key={ i } id={ id } type={ type } style={ arg1 } />
        }
      }) }
    </span>
  )
}
