import React, { useState, useEffect } from "react";
import useBookingStore from "../../../../store/provider/bookingStore";

function DateAndTime() {
  const [currentDate, setCurrentDate] = useState(() => {
    const now = new Date();
    return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  });

  const selectedDate = useBookingStore((state) => state.selectedDate);
  const selectedTimeSlot = useBookingStore((state) => state.selectedTimeSlot);
  const setSelectedDate = useBookingStore((state) => state.setSelectedDate);
  const setSelectedTimeSlot = useBookingStore((state) => state.setSelectedTimeSlot);

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const times = [
    { label: "9:00 am", value: "09:00" },
    { label: "9:45 am", value: "09:45" },
    { label: "10:30 am", value: "10:30" },
    { label: "11:15 am", value: "11:15" },
    { label: "12:00 pm", value: "12:00" },
    { label: "12:45 pm", value: "12:45" },
    { label: "1:00 pm", value: "13:00" },
    { label: "2:15 pm", value: "14:15" },
    { label: "3:00 pm", value: "15:00" },
    { label: "3:45 pm", value: "15:45" },
  ];

  const today = new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate()));

  const isSameDay = (d1, d2) =>
    d1 &&
    d2 &&
    d1.getUTCDate() === d2.getUTCDate() &&
    d1.getUTCMonth() === d2.getUTCMonth() &&
    d1.getUTCFullYear() === d2.getUTCFullYear();

  const year = currentDate.getUTCFullYear();
  const month = currentDate.getUTCMonth();
  const firstDayOfMonth = new Date(Date.UTC(year, month, 1));
  const lastDayOfMonth = new Date(Date.UTC(year, month + 1, 0));
  const daysInMonth = lastDayOfMonth.getUTCDate();
  const startingWeekday = firstDayOfMonth.getUTCDay();

  const dates = Array.from({ length: startingWeekday }, () => null).concat(
    Array.from({ length: daysInMonth }, (_, i) => new Date(Date.UTC(year, month, i + 1)))
  );

  const isPast = (date) => {
    if (!date) return false;
    const dateUTC = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
    return dateUTC < today;
  };

  const isWeekend = (date) => [0, 6].includes(date.getUTCDay());

  const getWeekDays = (baseDate) => {
    const day = baseDate.getUTCDay();
    const monday = new Date(Date.UTC(baseDate.getUTCFullYear(), baseDate.getUTCMonth(), baseDate.getUTCDate() - ((day + 6) % 7)));
    return Array.from({ length: 5 }, (_, i) => {
      const d = new Date(monday);
      d.setUTCDate(monday.getUTCDate() + i);
      return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
    });
  };

  const handleWeekChange = (direction) => {
    const base = selectedDate ? new Date(selectedDate) : today;
    const newDate = new Date(Date.UTC(base.getUTCFullYear(), base.getUTCMonth(), base.getUTCDate() + direction * 7));
    setSelectedDate(newDate);
    setSelectedTimeSlot("");
  };

  const handleMonthChange = (offset) => {
    const newMonthDate = new Date(Date.UTC(year, month + offset, 1));
    let newSelectedDate = new Date(newMonthDate);
    while (newSelectedDate.getUTCDay() === 0 || newSelectedDate.getUTCDay() === 6) {
      newSelectedDate.setUTCDate(newSelectedDate.getUTCDate() + 1);
    }
    setCurrentDate(newMonthDate);
    setSelectedDate(newSelectedDate);
    setSelectedTimeSlot("");
  };

  const weekDays = getWeekDays(selectedDate || today);

  useEffect(() => {
    if (!selectedDate) {
      setSelectedDate(today);
    }
  }, [selectedDate]);

  return (
    <div className="flex gap-28 p-6 bg-white text-sm text-gray-700">
      {/* Calendar */}
      <div className="w-[260px]">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-lg">
            {currentDate.toLocaleString("default", { month: "long", timeZone: "UTC" })} {year}
          </h2>
          <div className="flex gap-2 text-lg">
            <button onClick={() => handleMonthChange(-1)}>&lt;</button>
            <button onClick={() => handleMonthChange(1)}>&gt;</button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {daysOfWeek.map((day) => (
            <span key={day} className="font-semibold">
              {day[0]}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 text-center">
          {dates.map((date, i) => {
            const isToday = isSameDay(date, today);
            const isSelected = isSameDay(date, selectedDate);
            const disabled = !date || isPast(date) || isWeekend(date);

            return (
              <button
                key={i}
                onClick={() => !disabled && setSelectedDate(date)}
                disabled={disabled}
                className={`w-8 h-8 rounded-full text-sm transition-colors ${
                  isSelected
                    ? "bg-primary-600 text-white"
                    : isToday
                    ? "border border-primary-600 text-primary-600"
                    : "hover:bg-gray-100"
                } ${disabled ? "opacity-30 cursor-not-allowed" : ""}`}
              >
                {date ? date.getUTCDate() : ""}
              </button>
            );
          })}
        </div>

        <select className="mt-6 p-2 border rounded w-full">
          <option>{Intl.DateTimeFormat().resolvedOptions().timeZone}</option>
          <option>(GMT+06:00) Asia/Dhaka</option>
          <option>(GMT+05:30) Asia/Kolkata</option>
        </select>
      </div>

      {/* Weekly Time Slots */}
      <div className="flex flex-col gap-2 w-full overflow-x-auto">
        <div className="flex justify-between items-center mb-2">
          <button
            onClick={() => handleWeekChange(-1)}
            className="text-lg p-1 rounded hover:bg-gray-200"
          >
            ⬅️
          </button>
          <h3 className="font-semibold text-center text-gray-800 text-base">
            {weekDays[0].toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
              timeZone: "UTC",
            })}{" "}
            -{" "}
            {weekDays[4].toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
              timeZone: "UTC",
            })}
          </h3>
          <button
            onClick={() => handleWeekChange(1)}
            className="text-lg p-1 rounded hover:bg-gray-200"
          >
            ➡️
          </button>
        </div>

        <div className="flex gap-4">
          {weekDays.map((day) => {
            const isSelectedDay = isSameDay(day, selectedDate);
            const label = day.toLocaleDateString("en-US", {
              weekday: "short",
              day: "numeric",
              timeZone: "UTC",
            });

            return (
              <div
                key={label}
                className={`min-w-[120px] text-center p-1 rounded-lg ${
                  isSelectedDay ? "bg-amber-100 border border-primary-400" : ""
                }`}
              >
                <h4 className="mb-2 font-medium">{label}</h4>
                {times.map((time) => {
                  const id = `${label} - ${time.value}`;
                  const isSelectedTime = selectedTimeSlot === id;

                  return (
                    <button
                      key={id}
                      onClick={() => {
                        setSelectedDate(day);
                        setSelectedTimeSlot(id);
                      }}
                      className={`w-full mb-1 py-1 rounded border text-sm ${
                        isSelectedTime
                          ? "bg-primary-600 text-white"
                          : "hover:bg-primary-100 border-gray-300"
                      }`}
                    >
                      {time.label}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default DateAndTime;
