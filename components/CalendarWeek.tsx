import cn from "classnames";
import { memo } from "react";

import styles from "styles/_calendar.module.scss";
import { IntervalWeekType } from "types";

const CalendarWeek: React.FC = () => {
  const week: IntervalWeekType = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const { week_cell, calendar_grid } = styles;
  return (
    <div className={cn(calendar_grid)}>
      {week.map((day) => (
        <div key={day} className={cn(week_cell)}>
          {day}
        </div>
      ))}
    </div>
  );
};

export default memo(CalendarWeek);
