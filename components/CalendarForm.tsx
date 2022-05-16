import { Form, Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

import ModalCom from "./Modal";
import { getRandomColor } from "services/helpers";
import { getMoonday } from "services/dayJs";
import { useForm } from "hooks/useForm";
import { useEventContext } from "contexts/EventContext";
import { EventFormType, EventType } from "types";

type CalendarFormType = {
  handleClose: () => void;
  show: boolean;
  dateSelected: string;
  typeAction: "Edit" | "Save";
  event?: EventType;
};

const CalendarForm: React.FC<CalendarFormType> = ({ typeAction, show, handleClose, dateSelected, event }) => {
  const { dispatch } = useEventContext();
  const edit = typeAction === "Edit";
  let initialStateEdite = event && { label: event.label, time: event.time, inviteEmail: event.inviteEmail };

  const { values, handleChange, handleSubmit } = useForm(
    edit ? initialStateEdite : { label: "", time: "", inviteEmail: "" },
    (dataForm: EventFormType) => {
      if (edit && event) {
        dispatch!({
          type: "EDIT",
          value: { _id: event._id, ...dataForm },
        });
      } else {
        dispatch!({
          type: "ADD",
          value: { _id: uuidv4(), color: getRandomColor(), dateSelected, ...dataForm },
        });
      }
      handleClose();
    }
  );

  return (
    <ModalCom handleClose={handleClose} show={show} title={getMoonday(dateSelected)}>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Event Name</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            name="label"
            maxLength={100}
            onChange={handleChange}
            value={values.label}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Time</Form.Label>
          <Form.Control name="time" type="time" onChange={handleChange} value={values.time} required />
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Label>Invite Email</Form.Label>
          <Form.Control name="inviteEmail" type="email" onChange={handleChange} value={values.inviteEmail} required />
        </Form.Group>
        <div className="d-flex justify-content-end mb-1">
          <Button type="submit" className="float-right">
            {typeAction} Event
          </Button>
        </div>
      </Form>
    </ModalCom>
  );
};

export default CalendarForm;
