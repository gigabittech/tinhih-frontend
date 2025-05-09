function convertTo12HourFormat(time24) {
  const [hour, minute] = time24.split(":");
  const h = parseInt(hour, 10);
  const suffix = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 || 12;
  return `${hour12}:${minute} ${suffix}`;
}
export default convertTo12HourFormat;
