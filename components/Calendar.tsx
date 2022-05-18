import React, { memo, useState, useCallback, useMemo } from "react";
import cn from "classnames";

import CalendarWeek from "./CalendarWeek";
import CalendarDay from "./CalendarDay";
import CalendarForm from "./CalendarForm";
import CalendarEventDetail from "./CalendarEventDetail";
import styles from "styles/_calendar.module.scss";
import { getDate } from "services/helpers";
import { MountYearType, EventType } from "types";
import { createDate } from "services/dayJs";
import { useEventContext } from "contexts/EventContext";

const Calandar: React.FC<{ mountYear: MountYearType }> = ({ mountYear }) => {
  const [showDetailEvent, setShowDetailEvent] = useState(false);
  const [typeActionForm, setTypeActionForm] = useState<"Save" | "Edit">("Save");
  const [dateSelected, setDateSelected] = useState("");
  const [event, setEvent] = useState<EventType | null>(null);
  const [showForm, setShowForm] = useState(false);
  const { todayDate } = getDate();
  const { events, loading } = useEventContext().state;
  const { month, year } = mountYear;
  const calendarDate = useMemo(() => createDate({ month, year }), [month, year]);
  const handleClose = () => setShowForm(false);
  const handleCloseDetailEvent = () => setShowDetailEvent(false);

  const handleShowForm = useCallback(
    (param: string) => (e: React.MouseEvent<HTMLElement>) => {
      if (e.target !== e.currentTarget) return;
      if (loading) return;

      const fileterEvents = events.filter((e) => e.dateSelected === param);
      if (fileterEvents.length >= 3) {
        alert("Only 3 events can be added in a day");
        return false;
      }

      if (events.length >= 50) {
        alert("Only 50 events added");
        return false;
      }

      setTypeActionForm("Save");
      setDateSelected(param);
      setShowForm(true);

      e.stopPropagation();
    },
    [loading, events]
  );

  const handleShowDetailEvent = useCallback(
    (param: EventType) => (e: React.MouseEvent<HTMLElement>) => {
      setEvent(param);
      setShowDetailEvent(true);
    },
    []
  );

  const handleShowEditForm = useCallback(
    (param: EventType) => (e: React.MouseEvent<HTMLElement>) => {
      setShowDetailEvent(false);
      setDateSelected(param.dateSelected);
      setEvent(param);
      setTypeActionForm("Edit");
      setTimeout(() => {
        setShowForm(true);
      }, 300);
    },
    []
  );

  const { day_cell, calendar_grid } = styles;
  return (
    <>
      <CalendarWeek />
      <div className={cn(calendar_grid, day_cell)}>
        {calendarDate.map((day) => (
          <React.Fragment key={day.dateString}>
            <CalendarDay
              handleShowForm={handleShowForm}
              thisDay={todayDate === day.dateString}
              isCurrentMonth={day.isCurrentMonth}
              dateString={day.dateString}
              dayOfMonth={day.dayOfMonth}
              handleShowDetailEvent={handleShowDetailEvent}
            />
          </React.Fragment>
        ))}
      </div>
      {showForm && (
        <CalendarForm
          dateSelected={dateSelected}
          handleClose={handleClose}
          event={event!}
          show={showForm}
          typeAction={typeActionForm}
        />
      )}
      {showDetailEvent && (
        <CalendarEventDetail
          handleShowEditForm={handleShowEditForm}
          handleClose={handleCloseDetailEvent}
          event={event!}
          show={showDetailEvent}
        />
      )}
    </>
  );
};

export default memo(Calandar);
