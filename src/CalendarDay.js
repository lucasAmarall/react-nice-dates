import React from 'react'
import { bool, instanceOf, func, number, object, objectOf, string } from 'prop-types'
import { getDate, format, isToday } from 'date-fns'
import classNames from 'classnames'

const defaultModifiersClassNames = {
  today: '-today',
  outside: '-outside',
  wide: '-wide',
  disabled: '-disabled',
  selected: '-selected',
  selectedStart: '-selected-start',
  selectedMiddle: '-selected-middle',
  selectedEnd: '-selected-end'
}

export default function CalendarDay({
  date,
  height,
  locale,
  modifiers: receivedModifiers,
  modifiersClassNames: receivedModifiersClassNames,
  onClick,
  onHover,
  getDayAriaLabel,
}) {
  const dayOfMonth = getDate(date)
  const dayClassNames = {}
  const modifiers = { today: isToday(date), ...receivedModifiers }
  const modifiersClassNames = { ...defaultModifiersClassNames, ...receivedModifiersClassNames }

  Object.keys(modifiers).forEach(name => {
    dayClassNames[modifiersClassNames[name]] = modifiers[name]
  })

  const handleClick = event => {
    onClick(date)
    event.preventDefault()
  }

  const handleMouseEnter = () => {
    onHover(date)
  }

  const handleMouseLeave = () => {
    onHover(null)
  }

  return (
    <a
      className={classNames('nice-dates-day', dayClassNames)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchEnd={handleClick}
      style={{ height }}
      aria-label={getDayAriaLabel(date)}
      onClick={handleClick}
      href="javascript:;"
    >
      <span className='nice-dates-day_date'>
        {dayOfMonth}
      </span>
    </a>
  )
}

CalendarDay.propTypes = {
  date: instanceOf(Date).isRequired,
  height: number.isRequired,
  locale: object.isRequired,
  modifiers: objectOf(bool),
  modifiersClassNames: objectOf(string),
  onHover: func,
  onClick: func,
  getDayAriaLabel: func
}

CalendarDay.defaultProps = {
  modifiers: {},
  onHover: () => {},
  onClick: () => {},
  getDayAriaLabel: () => {},
}
