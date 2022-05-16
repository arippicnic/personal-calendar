import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";

import { MountYearType } from "types";

dayjs.extend(weekday);
dayjs.extend(weekOfYear);
dayjs.Ls.en.weekStart = 1;

export function getWeekday(dateString: string) {
  return dayjs(dateString).weekday();
}
export function getMoonday(param: string) {
  return dayjs(param).format("dddd - D MMMM YYYY");
}
export function isWeekendDay(dateString: string) {
  return [6, 0].includes(getWeekday(dateString));
}

export function createDate({ year, month }: MountYearType) {
  const daysInMonth = new Date(year, month, 0).getDate();
  const createDaysForCurrentMonth = [...Array(daysInMonth)].map((_, index) => {
    const dayOfMonth = index + 1;
    const dateString = dayjs(`${year}-${month}-${dayOfMonth}`).format("YYYY-MM-DD");
    return {
      dateString,
      dayOfMonth,
      isCurrentMonth: true,
    };
  });

  const firstDayOfTheMonthWeekday = getWeekday(createDaysForCurrentMonth[0].dateString);
  const previousMonth = dayjs(`${year}-${month}-01`).subtract(1, "month");
  const previousMonthLastMondayDayOfMonth = dayjs(createDaysForCurrentMonth[0].dateString)
    .subtract(firstDayOfTheMonthWeekday, "day")
    .date();
  const createDaysForPreviousMonth = [...Array(firstDayOfTheMonthWeekday)].map((_, index) => {
    return {
      dateString: dayjs(
        `${previousMonth.year()}-${previousMonth.month() + 1}-${previousMonthLastMondayDayOfMonth + index}`
      ).format("YYYY-MM-DD"),
      dayOfMonth: previousMonthLastMondayDayOfMonth + index,
      isCurrentMonth: false,
      isPreviousMonth: true,
    };
  });

  const lastDayOfTheMonthWeekday = getWeekday(`${year}-${month}-${createDaysForCurrentMonth.length}`);
  const nextMonth = dayjs(`${year}-${month}-01`).add(1, "month");
  const visibleNumberOfDaysFromNextMonth = 6 - lastDayOfTheMonthWeekday;
  const createDaysForNextMonth = [...Array(visibleNumberOfDaysFromNextMonth)].map((_, index) => {
    return {
      dateString: dayjs(`${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`).format("YYYY-MM-DD"),
      dayOfMonth: index + 1,
      isCurrentMonth: false,
      isNextMonth: true,
    };
  });

  return [...createDaysForPreviousMonth, ...createDaysForCurrentMonth, ...createDaysForNextMonth];
}
