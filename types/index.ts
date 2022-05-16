export type IntervalWeekType = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
export type MonthType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type MonthDaysType = {
  dateString: string;
  dayOfMonth: number;
  isCurrentMonth: boolean;
};
export type MountYearType = {
  month: MonthType;
  year: number;
  day?: number;
};

export type EventFormType = {
  label: string;
  time: string;
  inviteEmail: string;
};
export type EventEditeType = {
  _id: string;
} & EventFormType;

export type EventType = {
  dateSelected: string;
  color: string;
} & EventFormType &
  EventEditeType;

export type EventStateType = {
  events: EventType[];
  loading?: boolean;
};

export type EventActionType =
  | { type: "STORAGE"; value: EventStateType }
  | { type: "ADD"; value: EventType }
  | { type: "EDIT"; value: EventEditeType }
  | { type: "REMOVE"; value: EventType["_id"] };

export type EventContextType = {
  state: EventStateType;
  dispatch?: React.Dispatch<EventActionType>;
};
