import cn from "classnames";
import { memo } from "react";

import CalendarEvent from "./CalendarEvent";
import styles from "styles/_calendar.module.scss";
import { MonthDaysType, EventType } from "types";

type CalendarDayType = {
  handleShowForm: (param: string) => (e: React.MouseEvent<HTMLElement>) => void;
  handleShowDetailEvent: (param: EventType) => (e: React.MouseEvent<HTMLElement>) => void;
  thisDay: boolean;
} & MonthDaysType;

const CalendarDay: React.FC<CalendarDayType> = ({
  dateString,
  isCurrentMonth,
  dayOfMonth,
  handleShowForm,
  thisDay,
  handleShowDetailEvent,
}) => {
  const { day_cell_item, day_cell_current, day_cell_number, day_cell_label } = styles;
  return (
    <div
      onClick={handleShowForm(dateString)}
      className={cn(day_cell_item, isCurrentMonth && day_cell_current, { "text-info": thisDay })}
    >
      <div className={cn(day_cell_number)}>{dayOfMonth}</div>
      <div className={cn(day_cell_label)}>
        <CalendarEvent dateSelected={dateString} handleShowDetailEvent={handleShowDetailEvent} />
      </div>
    </div>
  );
};

export default memo(CalendarDay);
