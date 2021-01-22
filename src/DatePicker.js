import React, { useState } from 'react'
import { func, instanceOf, object, objectOf, string } from 'prop-types'
import useDateInput from './useDateInput'
import useDetectTouch from './useDetectTouch'
import useOutsideClickHandler from './useOutsideClickHandler'
import DatePickerCalendar from './DatePickerCalendar'
import Popover from './Popover'

export default function DatePicker({
  children,
  locale,
  date,
  onDateChange,
  format,
  minimumDate,
  maximumDate,
  modifiers,
  modifiersClassNames,
  weekdayFormat,
  getDayAriaLabel,
}) {
  const [month, setMonth] = useState(date || new Date())
  const [focused, setFocused] = useState(false)
  const isTouch = useDetectTouch()

  const [inputRef, popoverRef] = useOutsideClickHandler(() => {
    if (focused) {
      setFocused(false)
    }
  })

  const inputProps = useDateInput({
    date,
    format,
    locale,
    minimumDate,
    maximumDate,
    onDateChange: date => {
      onDateChange(date)
      date && setMonth(date)
    }
  })

  const handleDateChange = date => {
    onDateChange(date)
    setFocused(false)
  }

  return (
    <div className='nice-dates'>
      {children({
        inputProps: {
          ...inputProps,
          ref: inputRef,
          onFocus: () => {
            inputProps.onFocus()
            setFocused(true)

            if (isTouch) {
              inputRef.current.blur()
            }
          },
          readOnly: isTouch
        },
        focused
      })}

      <Popover open={focused} ref={popoverRef}>
        <DatePickerCalendar
          locale={locale}
          date={date}
          month={month}
          onDateChange={handleDateChange}
          onMonthChange={setMonth}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          modifiers={modifiers}
          modifiersClassNames={modifiersClassNames}
          weekdayFormat={weekdayFormat}
          getDayAriaLabel={getDayAriaLabel}
      />
      </Popover>
    </div>
  )
}

DatePicker.propTypes = {
  children: func.isRequired,
  locale: object.isRequired,
  date: instanceOf(Date),
  onDateChange: func,
  format: string,
  minimumDate: instanceOf(Date),
  maximumDate: instanceOf(Date),
  modifiers: objectOf(func),
  modifiersClassNames: objectOf(string),
  getDayAriaLabel: func,
  weekdayFormat: string
}

DatePicker.defaultProps = {
  onDateChange: () => {},
  getDayAriaLabel: () => {},
  onDateChange: () => {},
}
