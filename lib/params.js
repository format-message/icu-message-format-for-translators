import React from 'react'
import MessageFormat from 'message-format'
import { getParamsFromPatternAst } from './util'

export default function Params ({ ast, pattern, params, onChange }) {
  const placeholders = getParamsFromPatternAst(ast)
  const args = {}
  placeholders.forEach(param => {
    args[param.name] = params[param.name] || ''
    if (param.type === 'date') {
      if (typeof args[param.name] === 'string') {
        // yyyy-MM-dd is interpreted as UTC date
        // yyyy/MM/dd is interpreted as local date
        args[param.name] = args[param.name].replace(/-/g, '/')
      }
      args[param.name] = +new Date(args[param.name])
    } else if (param.type === 'time') {
      args[param.name] = +new Date('1/1/15 ' + args[param.name])
    }
  })

  let final = ''
  try { final = new MessageFormat(pattern).format(args) }
  catch (e) { final = e.message }

  const types = {
    number: 'number',
    select: 'text',
    plural: 'number',
    selectordinal: 'number',
    date: 'date',
    time: 'time'
  }

  return (
    <fieldset className='TryIt-params'>
      <legend className='TryIt-params-legend'>
        Preview final string with parameters:
      </legend>
      <div className='p-table'>
        { placeholders.map(param =>
          <label key={ param.name } className='p-row'>
            <span className='p-cell'>{ param.name }</span>
            <span className='p-cell'>
              <input
                className='p-cell'
                type={ types[param.type] || 'text' }
                name={ param.name }
                value={ params[param.name] || '' }
                onChange={ onChange }
              />
            </span>
          </label>
        ) }
      </div>
      <span className='TryIt-final'>{ final }</span>
    </fieldset>
  )
}
