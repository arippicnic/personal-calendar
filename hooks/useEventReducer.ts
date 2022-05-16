import { EventActionType, EventStateType } from "types";

export const actionEventReducer = (state: EventStateType, action: EventActionType) => {
  switch (action.type) {
    case "STORAGE":
      return {
        ...state,
        events: action.value.events,
        loading: false,
      };
    case "ADD":
      return {
        ...state,
        events: [...state.events, action.value],
      };
    case "EDIT":
      const { _id, label, inviteEmail, time } = action.value;
      const objIndex = state.events.findIndex((obj) => obj._id == _id);
      state.events[objIndex].label = label;
      state.events[objIndex].inviteEmail = inviteEmail;
      state.events[objIndex].time = time;

      return {
        ...state,
        events: [...state.events],
      };
    case "REMOVE":
      return {
        ...state,
        events: state.events.filter((e) => e._id !== action.value),
      };
    default:
      return state;
  }
};
