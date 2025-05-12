import React, { useEffect, useRef, useState } from "react";
import { cn } from "../../../../../lib/utils";
import useAppointmentStore from "../../../../../store/provider/appointmentsStore";
import { BsDot } from "react-icons/bs";

function MonthlyCalendar({
  dateSlots = [],
  selectedDate,
  onDateSelect,
  seeDetails,
}) {
  const { appointments, fetchAppointments } = useAppointmentStore();
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdownIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useState(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  return (
    <section className="h-full">
      {/* Calendar Header */}
      <div className="grid grid-cols-7 border-collapse h-[5%] text-description-1">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
          <div
            key={index}
            className="text-center text-sm flex items-center justify-center border-r border-outline-light font-bold text-context-lighter uppercase"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Body */}
      <div className="grid grid-cols-7 text-center h-[95%] border-collapse">
        {dateSlots?.map(({ date, currentMonth }, index) => {
          const isToday = date.toDateString() === new Date().toDateString();
          const isSelected =
            date.toDateString() === selectedDate?.toDateString();
          const dateToday = date.toISOString().split("T")[0];
          const hasAppointments = appointments.filter(
            (app) => app.date === dateToday
          );

          return (
            <div
              key={index}
              className={cn(
                "p-2 text-[13px] border-t border-r border-outline-light flex items-start justify-end text-base-content cursor-pointer relative",
                currentMonth ? "" : "bg-action-lighter ",
                isToday ? "font-extrabold text-sm " : "",
                isSelected ? " font-extrabold" : ""
              )}
              onClick={() => onDateSelect(date)}
            >
              {hasAppointments.length > 0 && (
                <div className=" text-start  absolute top-10 left-0 right-0 grid grid-cols-1 gap-1">
                  {hasAppointments.slice(0, 3).map((app) => (
                    <div
                      onClick={() => seeDetails(app.id)}
                      className="flex items-center bg-blue-400 rounded px-1 z-50"
                    >
                      <p>{app.date}</p>
                      <BsDot />
                      <p>{app.time}</p>
                    </div>
                  ))}
                  {hasAppointments.length > 3 && (
                    <div className="relative" ref={dropdownRef}>
                      <p
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenDropdownIndex(
                            index === openDropdownIndex ? null : index
                          );
                        }}
                        className="px-1 cursor-pointer text-primary-600 font-bold underline"
                      >
                        +{hasAppointments.length - 3} more
                      </p>

                      {openDropdownIndex === index && (
                        <div className="absolute z-50 top-full left-0 grid grid-cols-1 gap-2 bg-white shadow-lg rounded p-2 border border-gray-400">
                          {hasAppointments.slice(3).map((app, i) => (
                            <div onClick={() => seeDetails(app.id)} key={i}>
                              <div className="flex items-center bg-blue-400 rounded px-1">
                                <p>{app.date}</p>
                                <BsDot />
                                <p>{app.time}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
              <span
                className={cn(
                  isSelected && "border p-1 rounded-full size-7 shrink-0"
                )}
              >
                {date.getDate()}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default MonthlyCalendar;
