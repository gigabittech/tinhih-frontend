import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { IoMdCalendar } from "react-icons/io";
import { useCalendarStore } from "../../../../../FormSchema/Provider/calendarStore";

const HeadCalendar = ({
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  repeatOption,
  setRepeatOption,
}) => {
  const selectedDate = useCalendarStore((state) => state.selectedDate);
  const setSelectedDate = useCalendarStore((state) => state.setSelectedDate);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const calendarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        const button = document.querySelector(".calendar-button");
        if (button && !button.contains(event.target)) {
          closeCalendar();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const openCalendar = () => {
    setIsAnimating(true);
    setShowCalendar(true);
  };

  const closeCalendar = () => {
    setIsAnimating(true);
    setShowCalendar(false);
    setTimeout(() => setIsAnimating(false), 200);
  };

  const toggleCalendar = () => {
    if (showCalendar) {
      closeCalendar();
    } else {
      openCalendar();
    }
  };

  // Generate days for the current month view
  const getDaysInMonth = (year, month) => {
    const date = new Date(year, month, 1);
    const days = [];

    // Get days from previous month to fill the first week
    const firstDayOfWeek = date.getDay();
    const prevMonth = new Date(year, month - 1, 1);
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, daysInPrevMonth - i),
        currentMonth: false,
      });
    }

    // Get days from current month
    while (date.getMonth() === month) {
      days.push({
        date: new Date(date),
        currentMonth: true,
      });
      date.setDate(date.getDate() + 1);
    }

    // Get days from next month to fill the last week
    const lastDayOfWeek = date.getDay();
    if (lastDayOfWeek !== 0) {
      for (let i = 1; i <= 7 - lastDayOfWeek; i++) {
        days.push({
          date: new Date(year, month + 1, i),
          currentMonth: false,
        });
      }
    }

    return days;
  };

  const days = getDaysInMonth(
    currentDate.getFullYear(),
    currentDate.getMonth()
  );

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  const handleDateClick = (day) => {
    setSelectedDate(day.date);
    console.log(day);
    
  };

  const timeOptions = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "01:00 PM",
    "01:30 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
    "05:00 PM",
    "05:30 PM",
    "06:00 PM",
    "06:30 PM",
    "07:00 PM",
    "07:30 PM",
    "08:00 PM",
    "08:30 PM",
    "09:00 PM",
    "09:30 PM",
    "10:00 PM",
    "10:30 PM",
  ];

  const repeatOptions = [
    "Doesn't repeat",
    "Daily",
    "Weekly",
    "Monthly",
    "Yearly",
    "Custom...",
  ];

  return (
    <div className="relative">
      <button
        onClick={toggleCalendar}
        className="calendar-button flex items-center gap-2 px-3 py-2 text-start hover:bg-gray-50 rounded transition-colors duration-150"
      >
        <IoMdCalendar size={20} className="text-gray-600" />
        <span className="grid">
          <span className="text-sm font-medium">
            {formatDate(selectedDate)}
          </span>
          <span className="text-xs text-gray-500">
            {startTime} – {endTime}
          </span>
        </span>
      </button>

      {/* Calendar popup with transitions */}
      <div
        ref={calendarRef}
        className={`absolute z-10 mt-2 w-[305%] p-4 bg-white rounded-lg shadow-lg border border-gray-200 transition-all duration-200 ease-out ${
          showCalendar
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-2 pointer-events-none"
        }`}
      >
        {/* Selected date display */}
        {selectedDate && (
          <div className="mb-4">
            <h2 className="font-semibold text-lg">
              {formatDate(selectedDate)}
            </h2>
            <p className="text-gray-600 text-sm">
              {startTime} – {endTime} - {repeatOption}
            </p>
          </div>
        )}

        <hr className="my-4" />

        {/* Calendar header */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={handlePrevMonth}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h3 className="font-semibold">
            {currentDate?.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </h3>
          <button
            onClick={handleNextMonth}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1 mb-4">
          {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
            <div
              key={day}
              className="text-center text-sm font-medium text-gray-500"
            >
              {day}
            </div>
          ))}
          {days.map((day, index) => (
            <button
              key={index}
              onClick={() => handleDateClick(day)}
              className={`p-2 rounded-full text-sm transition-colors ${
                day.currentMonth ? "text-gray-900" : "text-gray-400"
              } ${
                selectedDate &&
                day.date.toDateString() === selectedDate.toDateString()
                  ? "bg-primary-500 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {day.date.getDate()}
            </button>
          ))}
        </div>

        <hr className="my-4" />

        {/* Time selection */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2 text-sm">Start and end time</h3>
          <div className="flex items-center space-x-2">
            <select
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="border rounded p-2 text-sm w-full transition-colors hover:border-gray-400"
            >
              {timeOptions.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
            <span className="text-gray-500">-</span>
            <select
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="border rounded p-2 text-sm w-full transition-colors hover:border-gray-400"
            >
              {timeOptions.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
          <p className="text-xs text-gray-500 mt-2">Available times</p>
          <p className="text-xs text-gray-400">No available times found.</p>
        </div>

        <hr className="my-4" />

        {/* Repeat options */}
        <div>
          <h3 className="font-semibold mb-2 text-sm">Repeat</h3>
          <select
            value={repeatOption}
            onChange={(e) => setRepeatOption(e.target.value)}
            className="w-full border rounded p-2 text-sm transition-colors hover:border-gray-400"
          >
            {repeatOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Close button */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={closeCalendar}
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 text-sm transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeadCalendar;
