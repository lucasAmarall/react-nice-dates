import React, { useState } from 'react'
import { enUS, es } from 'date-fns/locale'
import { DatePicker } from '../../src'
import Example from './Example'

const code = `
import React, { useState } from 'react'
import { enUS, es } from 'date-fns/locale'
import { DatePicker } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'

export default function LocalesExample() {
  const [date, setDate] = useState()

  return (
    <div>
      <p>US English:</p>

      <DatePicker date={date} onDateChange={setDate} locale={enUS}>
        {({ inputProps, focused }) => (
          <input className={'input' + (focused ? ' -focused' : '')} {...inputProps} />
        )}
      </DatePicker>

      <p>Spanish:</p>

      <DatePicker date={date} onDateChange={setDate} locale={es} format='dd/MM/yyyy'>
        {({ inputProps, focused }) => (
          <input className={'input' + (focused ? ' -focused' : '')} {...inputProps} placeholder='DD/MM/YYYY' />
        )}
      </DatePicker>
    </div>
  )
}
`

export default function LocalesExample() {
  const [date, setDate] = useState()

  return (
    <Example code={code}>
      <p>US English:</p>

      <DatePicker date={date} onDateChange={setDate} locale={enUS} getDayAriaLabel={date => `LocalesExample.js ${date}`}>
        {({ inputProps, focused }) => <input className={'input' + (focused ? ' -focused' : '')} {...inputProps} />}
      </DatePicker>

      <br />

      <p>Spanish:</p>

      <DatePicker date={date} onDateChange={setDate} locale={es} format='dd/MM/yyyy' getDayAriaLabel={date => `LocalesExample.js2 ${date}`}>
        {({ inputProps, focused }) => (
          <input className={'input' + (focused ? ' -focused' : '')} {...inputProps} />
        )}
      </DatePicker>
    </Example>
  )
}
