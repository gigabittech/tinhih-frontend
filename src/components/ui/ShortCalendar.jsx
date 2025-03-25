import React, { useMemo } from "react";
import { cn } from "../../lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "./Button";

const ShortCalendar = ({
  currentDate,
  setCurrentDate,
  onDateSelect,
  selectedDate,
  theme = {
    width: "w-[15rem]",
    dayTextSize: "text-xs",
    dayTextWidth: "w-6 h-6",
    gap: "gap-2",
  },
}) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daySlots = useMemo(() => getMonthSlots(year, month), [year, month]);

  const changeMonth = (offset) => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + offset,
      1
    );
    setCurrentDate(newDate);
  };

  const changeYear = (offset) => {
    const newDate = new Date(
      currentDate.getFullYear() + offset,
      currentDate.getMonth(),
      1
    );
    setCurrentDate(newDate);
  };

  const handleDateClick = (date, isCurrentMonth) => {
    onDateSelect?.(date);
    if (!isCurrentMonth) {
      setCurrentDate(new Date(date.getFullYear(), date.getMonth(), 1));
    }
  };

  return (
    <div className={cn("overflow-hidden", theme?.width)}>
      <CalendarHeader
        currentDate={currentDate}
        handleMonthChange={changeMonth}
        handleYearChange={changeYear}
      />
      <CalendarGrid
        daySlots={daySlots}
        selectedDate={selectedDate}
        handleDateClick={handleDateClick}
        theme={theme}
      />
    </div>
  );
};

const CalendarHeader = ({
  currentDate,
  handleMonthChange,
  handleYearChange,
}) => (
  <div className="flex flex-wrap items-center justify-between mb-5 gap-2 mx-1 mt-1">
    <div className="flex items-center space-x-1">
      <NavButton
        onClick={() => handleMonthChange(-1)}
        label="Previous Month"
        icon={<ChevronLeft size={20} />}
      />
      <div className="text-sm font-semibold">
        {currentDate instanceof Date
          ? new Intl.DateTimeFormat("en-US", { month: "short" }).format(
              currentDate
            )
          : "Loading..."}
      </div>
      <NavButton
        onClick={() => handleMonthChange(1)}
        label="Next Month"
        icon={<ChevronRight size={20} />}
      />
    </div>
    <div className="flex items-center space-x-1">
      <NavButton
        onClick={() => handleYearChange(-1)}
        label="Previous Year"
        icon={<ChevronLeft size={20} />}
      />
      <div className="font-semibold text-sm">
        {currentDate instanceof Date ? currentDate.getFullYear() : "Loading..."}
      </div>
      <NavButton
        onClick={() => handleYearChange(1)}
        label="Next Year"
        icon={<ChevronRight size={20} />}
      />
    </div>
  </div>
);

const CalendarGrid = ({ daySlots, selectedDate, handleDateClick, theme }) => (
  <div className={cn("grid grid-cols-7", theme?.gap, theme?.dayTextSize)}>
    {["S", "M", "T", "W", "T", "F", "S"].map((d, index) => (
      <div
        key={index}
        className={cn(
          "text-center font-semibold text-context-lighter ml-[1.5px]",
          theme?.dayTextWidth
        )}
      >
        {d}
      </div>
    ))}

    {daySlots.map(({ date, currentMonth }, index) => {
      const isToday = date.toDateString() === new Date().toDateString();
      const isSelected =
        selectedDate && date.toDateString() === selectedDate.toDateString();
      return (
        <div key={index} className="flex items-center justify-center">
          <div
            onClick={() => handleDateClick(date, currentMonth)}
            className={cn(
              "rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer",
              isToday
                ? "bg-primary-500 text-fixed-100 font-bold"
                : isSelected
                ? "text-primary-800 font-extrabold bg-action-lighter"
                : "hover:bg-action-light hover:font-bold hover:scale-105",
              !currentMonth && "text-context-lighter",
              theme?.dayTextWidth
            )}
          >
            {date.getDate()}
          </div>
        </div>
      );
    })}
  </div>
);

const NavButton = ({ onClick, label, icon }) => (
  <Button
    onClick={onClick}
    aria-label={label}
    variant="ghost"
    size="none"
    className="h-5 w-5 p-1 rounded-full bg-base-300"
  >
    {icon}
  </Button>
);

export default ShortCalendar;

export const getMonthSlots = (year, month) => {
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthLastDate = new Date(year, month, 0).getDate();
  const slots = [];

  for (let i = firstDayOfWeek; i > 0; i--) {
    slots.push({
      date: new Date(year, month - 1, prevMonthLastDate - i + 1),
      currentMonth: false,
    });
  }

  for (let i = 1; i <= lastDayOfMonth; i++) {
    slots.push({ date: new Date(year, month, i), currentMonth: true });
  }

  while (slots.length % 7 !== 0 || slots.length < 42) {
    slots.push({
      date: new Date(
        year,
        month + 1,
        slots.length - lastDayOfMonth - firstDayOfWeek + 1
      ),
      currentMonth: false,
    });
  }

  return slots;
};

export const getWeekSlots = (selectedDate) => {
  const dayOfWeek = selectedDate.getDay();

  let startOfWeek = new Date(selectedDate);
  startOfWeek.setDate(selectedDate.getDate() - dayOfWeek);

  let slots = [];

  for (let i = 0; i < 7; i++) {
    let slotDate = new Date(startOfWeek);
    slotDate.setDate(startOfWeek.getDate() + i);

    slots.push({
      date: slotDate,
      currentMonth: slotDate.getMonth() === selectedDate.getMonth(),
    });
  }

  return slots;
};

export const getDateRange = (selectedDate, duration) => {
  let slots = [];

  for (let i = 0; i < duration; i++) {
    let slotDate = new Date(selectedDate);
    slotDate.setDate(selectedDate.getDate() + i);

    slots.push({
      date: slotDate,
      currentMonth: slotDate.getMonth() === selectedDate.getMonth(),
    });
  }

  return slots;
};

export const generateHourlySlots = () => {
  const slots = [];
  for (let hour = 0; hour < 24; hour++) {
    const period = hour < 12 ? "AM" : "PM";
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    slots.push({ slot: hour, label: `${formattedHour} ${period}` });
  }
  return slots;
};
