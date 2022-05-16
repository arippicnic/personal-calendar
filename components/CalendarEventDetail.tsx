import { useCallback } from "react";
import { Button } from "react-bootstrap";

import ModalCom from "./Modal";
import { EventType } from "types";
import { useEventContext } from "contexts/EventContext";
import { getMoonday } from "services/dayJs";

type CalendarEventDetailType = {
  event: EventType;
  handleClose: () => void;
  show: boolean;
  handleShowEditForm: (param: EventType) => (e: React.MouseEvent<HTMLElement>) => void;
};

const CalendarEventDetail: React.FC<CalendarEventDetailType> = ({ event, handleClose, show, handleShowEditForm }) => {
  const { dispatch } = useEventContext();
  const { _id, label, time, inviteEmail, dateSelected, color } = event;

  const handleDelete = useCallback(() => {
    dispatch!({
      type: "REMOVE",
      value: _id,
    });
    handleClose();
  }, []);

  return (
    <ModalCom handleClose={handleClose} show={show} title={getMoonday(dateSelected)}>
      <div
        className="list-group-item list-group-item-action flex-column align-items-start mb-3 rounded"
        style={{ background: color }}
      >
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1">Invite {inviteEmail}</h5>
          <small>Time {time}</small>
        </div>
        <p>{label}</p>
      </div>
      <div className="d-flex justify-content-end mb-1">
        <Button type="button" className="btn-danger mx-2" onClick={handleDelete}>
          Delate
        </Button>
        <Button type="button" className="btn-primary" onClick={handleShowEditForm(event)}>
          Edit
        </Button>
      </div>
    </ModalCom>
  );
};

export default CalendarEventDetail;
