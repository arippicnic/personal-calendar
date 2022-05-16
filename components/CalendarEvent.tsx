import React from "react";
import cn from "classnames";

import styles from "styles/_calendar.module.scss";
import { useEventContext } from "contexts/EventContext";
import { EventType } from "types";

type CalendarEventType = {
  dateSelected: string;
  handleShowDetailEvent: (param: EventType) => (e: React.MouseEvent<HTMLElement>) => void;
};

const CalendarEvent: React.FC<CalendarEventType> = ({ dateSelected, handleShowDetailEvent }) => {
  const { events, loading } = useEventContext().state;
  const fileterEvents = events.filter((e) => e.dateSelected === dateSelected);
  return (
    <React.Fragment>
      {!loading &&
        fileterEvents.map((e) => (
          <div onClick={handleShowDetailEvent(e)} key={e._id} className="mb-2 rounded" style={{ background: e.color }}>
            <p className={cn(styles.day_cell_label_text)}>{e.label}</p>
          </div>
        ))}
    </React.Fragment>
  );
};

export default CalendarEvent;
