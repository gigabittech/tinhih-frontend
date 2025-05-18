import React, { useState } from "react";

function DateAndTime() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const times = [
    "9:00 am",
    "9:45 am",
    "10:30 am",
    "11:15 am",
    "12:00 pm",
    "12:45 pm",
    "1:30 pm",
    "2:15 pm",
    "3:00 pm",
    "3:45 pm",
  ];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isSameDay = (d1, d2) =>
    d1?.getDate?.() === d2?.getDate?.() &&
    d1?.getMonth?.() === d2?.getMonth?.() &&
    d1?.getFullYear?.() === d2?.getFullYear?.();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startingWeekday = firstDayOfMonth.getDay();

  const dates = Array.from({ length: startingWeekday }, () => null).concat(
    Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1))
  );

  const isPast = (date) => date < today;
  const isWeekend = (date) => [0, 6].includes(date.getDay());

  const getWeekDays = (baseDate) => {
    const day = baseDate.getDay();
    const monday = new Date(baseDate);
    monday.setDate(baseDate.getDate() - ((day + 6) % 7));

    return Array.from({ length: 5 }, (_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      return d;
    });
  };

  const handleWeekChange = (direction) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + direction * 7);
    setSelectedDate(newDate);
  };

  const weekDays = getWeekDays(selectedDate);

  const handleMonthChange = (offset) => {
    const newMonthDate = new Date(year, month + offset, 1);

    // Find the first weekday (Mon-Fri) in the new month
    let newSelectedDate = new Date(newMonthDate);
    while (newSelectedDate.getDay() === 0 || newSelectedDate.getDay() === 6) {
      newSelectedDate.setDate(newSelectedDate.getDate() + 1);
    }

    setCurrentDate(newMonthDate);
    setSelectedDate(newSelectedDate);
  };

  return (
    <div className="flex gap-28 p-6 bg-white text-sm text-gray-700">
      {/* --------- Calendar --------- */}
      <div className="w-[260px]">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-lg">
            {currentDate.toLocaleString("default", { month: "long" })} {year}
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
                {date ? date.getDate() : ""}
              </button>
            );
          })}
        </div>

        {/* Timezone */}
        <select className="mt-6 p-2 border rounded w-full">
          <option>{Intl.DateTimeFormat().resolvedOptions().timeZone}</option>
          <option>(GMT+06:00) Asia/Dhaka</option>
          <option>(GMT+05:30) Asia/Kolkata</option>
        </select>
      </div>

      {/* --------- Weekly Time Slots --------- */}
      <div className="flex flex-col gap-2 w-full overflow-x-auto">
        {/* Week Navigation Arrows */}
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
            })}{" "}
            -{" "}
            {weekDays[4].toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
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
                  const id = `${label} - ${time}`;
                  const isSelectedTime = selectedTimeSlot === id;

                  return (
                    <button
                      key={id}
                      onClick={() => setSelectedTimeSlot(id)}
                      className={`w-full mb-1 py-1 rounded border text-sm ${
                        isSelectedTime
                          ? "bg-primary-600 text-white"
                          : "hover:bg-primary-100 border-gray-300"
                      }`}
                    >
                      {time}
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
