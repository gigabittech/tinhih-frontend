import React from "react";
import { cn } from "../../../../../lib/utils";

function MonthlyCalendar({ dateSlots = [], selectedDate }) {
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
            date.toDateString() === selectedDate.toDateString();

          return (
            <div
              key={index}
              className={cn(
                "p-2 text-[13px] border-t border-r border-outline-light flex items-start justify-end text-base-content",
                currentMonth ? "" : "bg-action-lighter text-context-lighter",
                isToday ? "font-extrabold text-sm text-primary-700" : "",
                isSelected ? "text-primary-700 font-extrabold" : ""
              )}
            >
              <span
                className={cn(
                  isSelected && "border p-1 rounded-full size-7 shrink-0"
                )}
              >
                {" "}
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
