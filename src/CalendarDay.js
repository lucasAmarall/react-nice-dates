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
  hideAriaLabel,
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
      tabIndex={hideAriaLabel ? "-1" : "0"}
      className={classNames('nice-dates-day', dayClassNames)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchEnd={handleClick}
      style={{ height }}
      aria-hidden={hideAriaLabel}
      aria-label={getDayAriaLabel(date)}
      onClick={(!hideAriaLabel ? handleClick : () => null)}
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
  hideAriaLabel: bool,
  locale: object.isRequired,
  modifiers: objectOf(bool),
  modifiersClassNames: objectOf(string),
  onHover: func,
  onClick: func,
  getDayAriaLabel: func
}

CalendarDay.defaultProps = {
  hideAriaLabel: true,
  modifiers: {},
  onHover: () => {},
  onClick: () => {},
  getDayAriaLabel: () => {}
}
