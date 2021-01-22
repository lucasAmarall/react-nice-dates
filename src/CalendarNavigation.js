import React from 'react'
import { func, instanceOf, object } from 'prop-types'
import classNames from 'classnames'
import { addMonths, startOfMonth, subMonths, format, isSameMonth } from 'date-fns'

export default function CalendarNavigation({ locale, month, minimumDate, maximumDate, onMonthChange, getNextMonthAriaLabel,
  getPrevMonthAriaLabel, }) {
  const handlePrevious = event => {
    onMonthChange(startOfMonth(subMonths(month, 1)))
    event.preventDefault()
  }

  const handleNext = event => {
    onMonthChange(startOfMonth(addMonths(month, 1)))
    event.preventDefault()
  }

  return (
    <div className='nice-dates-navigation'>
      <a
        className={classNames('nice-dates-navigation_previous', {
          '-disabled': isSameMonth(month, minimumDate)
        })}
        onClick={handlePrevious}
        onTouchEnd={handlePrevious}
        tabIndex={1}
        aria-label={getPrevMonthAriaLabel(month)}
      />

      <span className='nice-dates-navigation_current' tabIndex={1}>
        {format(month, 'LLLL', { locale })}
        <span aria-hidden> / </span>
        {format(month, 'yyyy', { locale })}
      </span>

      <a
        className={classNames('nice-dates-navigation_next', {
          '-disabled': isSameMonth(month, maximumDate)
        })}
        onClick={handleNext}
        onTouchEnd={handleNext}
        tabIndex={1}
        aria-label={getNextMonthAriaLabel(month)}
      />
    </div>
  )
}

CalendarNavigation.propTypes = {
  locale: object.isRequired,
  month: instanceOf(Date).isRequired,
  minimumDate: instanceOf(Date),
  maximumDate: instanceOf(Date),
  onMonthChange: func.isRequired,
  getNextMonthAriaLabel: func,
  getPrevMonthAriaLabel: func,
}

CalendarNavigation.defaultProps = {
  getNextMonthAriaLabel: () => {},
  getPrevMonthAriaLabel: () => {},
}
