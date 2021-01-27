import React from 'react'
import { bool, object, string } from 'prop-types'
import { eachDayOfInterval, endOfWeek, startOfWeek, format } from 'date-fns'

export default function CalendarWeekHeader({ locale, weekdayFormat, shortWeekDay }) {
  const today = new Date()

  const weekDays = eachDayOfInterval({
    start: startOfWeek(today, { locale }),
    end: endOfWeek(today, { locale })
  }).map(date => format(date, weekdayFormat, { locale }))

  return (
    <div className='nice-dates-week-header'>
      {weekDays.map(day => (
        <span key={day} className='nice-dates-week-header_day' aria-hidden>
          {shortWeekDay ? day[0] : day}
        </span>
      ))}
    </div>
  )
}

CalendarWeekHeader.propTypes = {
  locale: object.isRequired,
  shortWeekDay: bool,
  weekdayFormat: string
}

CalendarWeekHeader.defaultProps = {
  shortWeekDay: false,
  weekdayFormat: 'eee'
}
