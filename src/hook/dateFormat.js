import React from "react";

function useDateFormat(dateToConvert) {
  const date = new Date(dateToConvert);

  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });

  const getOrdinalSuffix = (n) => {
    if (n > 3 && n < 21) return `${n}th`;
    switch (n % 10) {
      case 1:
        return `${n}st`;
      case 2:
        return `${n}nd`;
      case 3:
        return `${n}rd`;
      default:
        return `${n}th`;
    }
  };

  const formatted = `${getOrdinalSuffix(day)} ${month}`;

  return formatted;
}

export default useDateFormat;
