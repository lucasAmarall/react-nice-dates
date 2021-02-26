import React from "react";
import { bool, func, instanceOf, object, objectOf, string } from 'prop-types'
import { startOfMonth } from 'date-fns'
import { isSelectable, mergeModifiers } from './utils'
import useControllableState from "./useControllableState";
import CalendarNavigation from "./CalendarNavigation";
import CalendarWeekHeader from "./CalendarWeekHeader";
import CalendarGrid from "./CalendarGrid";

export default function Calendar({
  locale,
  month: receivedMonth,
  modifiers: receivedModifiers,
  modifiersClassNames,
  minimumDate,
  maximumDate,
  onMonthChange,
  onDayHover,
  onDayClick,
  weekdayFormat,
  getDayAriaLabel,
  shortWeekDay,
  getNextMonthAriaLabel,
  getPrevMonthAriaLabel,
  direction,
}) {
  const [month, setMonth] = useControllableState(
    receivedMonth,
    onMonthChange,
    startOfMonth(new Date())
  );

  const modifiers = mergeModifiers(
    { disabled: (date) => !isSelectable(date, { minimumDate, maximumDate }) },
    receivedModifiers
  );

  return (
    <div>
      <CalendarNavigation
        locale={locale}
        minimumDate={minimumDate}
        maximumDate={maximumDate}
        month={month}
        onMonthChange={setMonth}
        getNextMonthAriaLabel={getNextMonthAriaLabel}
        getPrevMonthAriaLabel={getPrevMonthAriaLabel}
      />

      <CalendarWeekHeader locale={locale} weekdayFormat={weekdayFormat} shortWeekDay={shortWeekDay} />

      <CalendarGrid
        locale={locale}
        modifiers={modifiers}
        modifiersClassNames={modifiersClassNames}
        month={month}
        onMonthChange={setMonth}
        onDayHover={onDayHover}
        onDayClick={onDayClick}
        getDayAriaLabel={getDayAriaLabel}
        direction={direction}
        minimumDate={minimumDate}
        maximumDate={maximumDate}
      />
    </div>
  );
}

Calendar.propTypes = {
  locale: object.isRequired,
  minimumDate: instanceOf(Date),
  maximumDate: instanceOf(Date),
  modifiers: objectOf(func),
  modifiersClassNames: objectOf(string),
  month: instanceOf(Date),
  onMonthChange: func,
  onDayHover: func,
  onDayClick: func,
  getDayAriaLabel: func,
  shortWeekDay: bool,
  getNextMonthAriaLabel: func,
  getPrevMonthAriaLabel: func,
  weekdayFormat: string,
  direction: string,
};
