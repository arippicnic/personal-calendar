import cn from "classnames";
import { useEffect, useState, useCallback } from "react";
import { ButtonToolbar, Button, ButtonGroup } from "react-bootstrap";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

import styles from "styles/_calendar.module.scss";
import { MountYearType, MonthType } from "types";
import { getDate, getDateName } from "services/helpers";

interface CalandarNavigantionType {
  mountYear: MountYearType;
  setMountYear: React.Dispatch<MountYearType>;
  dateName: string;
}

const CalandarNavigantion: React.FC<CalandarNavigantionType> = ({ dateName, mountYear, setMountYear }) => {
  const [dateFormartName, setdateFormartName] = useState<string>(dateName);
  const { month, year } = mountYear;

  const handleToday = useCallback(() => {
    if (month === getDate().month) return;
    setMountYear({ month: getDate().month, year: getDate().year });
  }, [mountYear]);

  const handleForward = useCallback(() => {
    let nextYear = year;
    let nextMonth = (month + 1) as MonthType;
    if (nextMonth > 12) {
      nextMonth = 1;
      nextYear = year + 1;
    }
    setMountYear({ month: nextMonth, year: nextYear });
  }, [mountYear]);

  const handleBack = useCallback(() => {
    let nextYear = year;
    let nextMonth = (month - 1) as MonthType;
    if (nextMonth < 1) {
      nextMonth = 12;
      nextYear = year - 1;
    }
    setMountYear({ month: nextMonth, year: nextYear });
  }, [mountYear]);

  useEffect(() => {
    setdateFormartName(getDateName({ year, month }));
  }, [month, year]);

  const { navigation, navigation_title } = styles;
  return (
    <div className={cn(navigation)}>
      <ButtonToolbar aria-label="Toolbar with button groups">
        <ButtonGroup size="lg" className="me-2 flex" aria-label="First group">
          <Button onClick={handleBack}>
            <BsChevronCompactLeft />
          </Button>
          <Button onClick={handleForward}>
            <BsChevronCompactRight />
          </Button>
        </ButtonGroup>
        <ButtonGroup aria-label="Third group">
          <Button onClick={handleToday}>Today</Button>
        </ButtonGroup>
      </ButtonToolbar>
      <h3 className={cn(navigation_title)}>{dateFormartName}</h3>
    </div>
  );
};

export default CalandarNavigantion;
