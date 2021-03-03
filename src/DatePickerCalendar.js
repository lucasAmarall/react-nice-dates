import React from 'react'
import { instanceOf, func, object, objectOf, string, bool } from 'prop-types'
import { isSameDay, startOfMonth } from 'date-fns'
import { isSelectable, mergeModifiers, setTime } from './utils'
import useControllableState from './useControllableState'
import Calendar from './Calendar'

export default function DatePickerCalendar({
  locale,
  date: selectedDate,
  month: receivedMonth,
  onDateChange,
  onMonthChange,
  minimumDate,
  maximumDate,
  modifiers: receivedModifiers,
  modifiersClassNames,
  weekdayFormat,
  shortWeekDay,
  getDayAriaLabel,
  getNextMonthAriaLabel,
  getPrevMonthAriaLabel,
}) {
  const isSelected = date => isSameDay(date, selectedDate) && isSelectable(date, { minimumDate, maximumDate })
  const modifiers = mergeModifiers({ selected: isSelected, disabled: isSelected }, receivedModifiers)
  const [month, setMonth] = useControllableState(receivedMonth, onMonthChange, startOfMonth(selectedDate || new Date()))

  const handleDateChange = date => {
    onDateChange(selectedDate ? setTime(date, selectedDate) : date)
  }

  return (
    <Calendar
      locale={locale}
      month={month}
      onMonthChange={setMonth}
      onDayClick={handleDateChange}
      minimumDate={minimumDate}
      maximumDate={maximumDate}
      modifiers={modifiers}
      modifiersClassNames={modifiersClassNames}
      weekdayFormat={shortWeekDay}
      getDayAriaLabel={getDayAriaLabel}
      getNextMonthAriaLabel={getNextMonthAriaLabel}
      getPrevMonthAriaLabel={getPrevMonthAriaLabel}
      weekdayFormat={weekdayFormat}
    />
  )
}

DatePickerCalendar.propTypes = {
  locale: object.isRequired,
  date: instanceOf(Date),
  month: instanceOf(Date),
  onDateChange: func,
  onMonthChange: func,
  getDayAriaLabel: func,
  shortWeekDay: bool,
  minimumDate: instanceOf(Date),
  maximumDate: instanceOf(Date),
  modifiers: objectOf(func),
  modifiersClassNames: objectOf(string),
  weekdayFormat: string,
  getNextMonthAriaLabel: func,
  getPrevMonthAriaLabel: func,
  weekdayFormat: string
}
