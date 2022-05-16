import { MountYearType, MonthType } from "types";

export function getDate() {
  const date = new Date();
  const todayDate = date.toLocaleDateString("en-CA");
  const month = (date.getUTCMonth() + 1) as MonthType;
  const year = date.getUTCFullYear();
  return { todayDate, month, year };
}

export function getDateName({ year, month }: MountYearType) {
  const formatter = new Intl.DateTimeFormat("en", { month: "long" });
  const monthName = formatter.format(new Date(year, month - 1, 1));
  return `${monthName} ${year}`;
}

export function getRandomColor() {
  return "hsl(" + 360 * Math.random() + "," + (25 + 70 * Math.random()) + "%," + (85 + 10 * Math.random()) + "%)";
}
