import React, { useState } from 'react'
import { isSameDay } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { Calendar } from '../../src'
import Example from './Example'

const code = `
import React, { useState } from 'react'
import { isSameDay } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { Calendar } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'

// Very rough implementation of multiple date selection
export default function CalendarExample() {
  const [selectedDates, setSelectedDates] = useState([])

  const modifiers = {
    selected: date => selectedDates.some(selectedDate => isSameDay(selectedDate, date))
  }

  const handleDayClick = date => {
    setSelectedDates([...selectedDates, date])
  }

  return (
    <Calendar onDayClick={handleDayClick} modifiers={modifiers} locale={enGB} />
  )
}

`

export default function CalendarExample() {
  const [selectedDates, setSelectedDates] = useState([])

  const modifiers = {
    selected: date => selectedDates.some(selectedDate => isSameDay(selectedDate, date))
  }

  const handleDayClick = date => {
    setSelectedDates([...selectedDates, date])
  }

  return (
    <Example code={code}>
      <Calendar onDayClick={handleDayClick} modifiers={modifiers} locale={enGB} getDayAriaLabel={
        date => `Calendar ${date}`
      }
      getNextMonthAriaLabel={(date) => `Go to: ${format(date, 'LLLL')}`}
      getPrevMonthAriaLabel={(date) => `Go back to: ${format(date, 'LLLL')}`}
      />
    </Example>
  )
}
