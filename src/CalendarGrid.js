import React from "react";
import { instanceOf, func, number, object, objectOf, string } from "prop-types";
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
import classNames from "classnames";
import useGrid from "./useGrid";
import { ORIGIN_BOTTOM, ORIGIN_TOP } from "./constants";
import CalendarDay from "./CalendarDay";
import { isSelectable } from './utils'

const computeModifiers = (modifiers, date) => {
  const computedModifiers = {};

  Object.keys(modifiers).map((key) => {
    computedModifiers[key] = modifiers[key](date);
  });

  return computedModifiers;
};

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
  direction,
  minimumDate,
  maximumDate,
}) {
  const grid = useGrid({  
    locale,
    month: startOfMonth(month),
    onMonthChange,
    transitionDuration,
    direction,
  });
  const {
    startDate,
    endDate,
    cellHeight,
    containerElementRef,
    isWide,
    offset,
    origin,
    transition,
  } = grid;

  const days = eachDayOfInterval({
    start: startDate,
    end: endDate,
  }).map((date) => {

    let hideAriaLabel = !isSelectable(date, { minimumDate, maximumDate }) || !isSameMonth(date, month);

    return (
      <CalendarDay
        date={date}
        height={cellHeight}
        key={lightFormat(date, "yyyy-MM-dd")}
        locale={locale}
        modifiers={{
          ...computeModifiers(modifiers, date),
          outside: !isSameMonth(date, month),
          wide: isWide,
        }}
        modifiersClassNames={modifiersClassNames}
        onHover={onDayHover}
        onClick={onDayClick}
        hideAriaLabel={hideAriaLabel}
        getDayAriaLabel={getDayAriaLabel}
        getNextMonthAriaLabel={getNextMonthAriaLabel}
        getPrevMonthAriaLabel={getPrevMonthAriaLabel}
      />
    );
  });

  return (
    <div className="nice-dates-grid" style={{ height: cellHeight * 6 }}>
      <div
        className={classNames("nice-dates-grid_container", {
          "-moving": offset,
          "-origin-bottom": origin === ORIGIN_BOTTOM,
          "-origin-top": origin === ORIGIN_TOP,
          "-transition": transition,
        })}
        ref={containerElementRef}
        style={{
          transform:
            direction === "ltr"
              ? `translate3d( ${offset}px,0, 0)`
              : `translate3d( 0,${offset}px, 0)`,
          transitionDuration: `${transitionDuration}ms`,
        }}
      >
        {days}
      </div>
    </div>
  );
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
  direction: string,
  minimumDate: instanceOf(Date),
  maximumDate: instanceOf(Date),
};

CalendarGrid.defaultProps = {
  modifiers: {},
  transitionDuration: 500,
};
