import { useMemo, useEffect } from "react";

import { EventActionType, EventStateType } from "types";

export const initialState: EventStateType = {
  events: [],
  loading: true,
};

export function eventStore([state, dispatch]: [EventStateType, React.Dispatch<EventActionType>]) {
  const keyLocal = "appInfo";

  useEffect(() => {
    const local = localStorage.getItem(keyLocal);
    const localJSON = local ? JSON.parse(local) : null;
    if (localJSON) {
      dispatch({ type: "STORAGE", value: localJSON });
    } else {
      dispatch({ type: "STORAGE", value: state });
      localStorage.setItem(keyLocal, JSON.stringify(state));
    }
  }, []);

  useEffect(() => {
    if (state !== initialState) {
      localStorage.setItem(keyLocal, JSON.stringify(state));
    }
  }, [state, dispatch]);

  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  return contextValue;
}
