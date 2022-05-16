import { createContext, useContext, useReducer } from "react";

import { EventContextType } from "types";
import { eventStore, initialState } from "hooks/useEventStore";
import { actionEventReducer } from "hooks/useEventReducer";

const EventContext = createContext<EventContextType>({ state: initialState });
export const useEventContext = () => useContext(EventContext);

export const EventWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const contextValue = eventStore(useReducer(actionEventReducer, initialState));

  return <EventContext.Provider value={contextValue}>{children}</EventContext.Provider>;
};
