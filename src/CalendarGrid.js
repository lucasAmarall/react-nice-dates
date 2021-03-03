import React from 'react'
import {
  addDays,
  eachDayOfInterval,
  isAfter,
  isBefore,
  isSameMonth,
  lightFormat,
  startOfMonth,
  subDays,
} from "date-fns";
import { ORIGIN_BOTTOM, ORIGIN_TOP } from "./constants";
import { isSelectable } from './utils'
import { instanceOf, func, number, object, objectOf, string } from 'prop-types'
import classNames from 'classnames'
import useGrid from './useGrid'
import CalendarDay from './CalendarDay'

const computeModifiers = (modifiers, date) => {
  const computedModifiers = {}

  Object.keys(modifiers).map(key => {
    computedModifiers[key] = modifiers[key](date)
  })

  return computedModifiers
}

export default function CalendarGrid({
  locale,
  month,
  modifiers,
  modifiersClassNames,
  onMonthChange,
  onDayHover,
  onDayClick,
  transitionDuration,
  getDayAriaLabel,
  getNextMonthAriaLabel,
  getPrevMonthAriaLabel,
  minimumDate,
  maximumDate,
  cellHeight: propCellHeight
}) {
  const grid = useGrid({ locale, month: startOfMonth(month), onMonthChange, transitionDuration, propCellHeight })
  const { startDate, endDate, cellHeight, containerElementRef, isWide, offset, origin, transition } = grid

  const days = eachDayOfInterval({
    start: startDate,
    end: endDate
  }).map(date => {
  const hideAriaLabel = !isSelectable(date, { minimumDate, maximumDate }) || !isSameMonth(date, month);

    return (
      <CalendarDay
        date={date}
        height={cellHeight}
        key={lightFormat(date, 'yyyy-MM-dd')}
        locale={locale}
        modifiers={{
          ...computeModifiers(modifiers, date),
          outside: !isSameMonth(date, month),
          wide: isWide
        }}
        modifiersClassNames={modifiersClassNames}
        onHover={onDayHover}
        onClick={onDayClick}
        hideAriaLabel={hideAriaLabel}
        getDayAriaLabel={getDayAriaLabel}
        getNextMonthAriaLabel={getNextMonthAriaLabel}
        getPrevMonthAriaLabel={getPrevMonthAriaLabel}
      />
    )
  })

  return (
    <div className='nice-dates-grid' style={{ height: cellHeight * 6 }}>
      <div
        className={classNames('nice-dates-grid_container', {
          '-moving': offset,
          '-origin-bottom': origin === ORIGIN_BOTTOM,
          '-origin-top': origin === ORIGIN_TOP,
          '-transition': transition
        })}
        ref={containerElementRef}
        style={{
          transform: `translate3d(0, ${offset}px, 0)`,
          transitionDuration: `${transitionDuration}ms`
        }}
      >
        {days}
      </div>
    </div>
  )
}

CalendarGrid.propTypes = {
  locale: object.isRequired,
  month: instanceOf(Date).isRequired,
  modifiers: objectOf(func),
  modifiersClassNames: objectOf(string),
  onMonthChange: func.isRequired,
  onDayHover: func,
  onDayClick: func,
  transitionDuration: number.isRequired,
  getDayAriaLabel: func,
  getNextMonthAriaLabel: func,
  getPrevMonthAriaLabel: func,
  minimumDate: instanceOf(Date),
  maximumDate: instanceOf(Date),
  cellHeight: number,
  transitionDuration: number.isRequired
}

CalendarGrid.defaultProps = {
  modifiers: {},
  cellHeight: 46,
  transitionDuration: 500
}
