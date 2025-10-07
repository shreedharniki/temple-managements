// utils/helpers.js

/**
 * Checks if the given date is greater than today's date.
 * @param {string | Date} date - The date to check (e.g. "2025-10-08" or Date object)
 * @returns {boolean} True if the date is in the future, false otherwise
 */
export const isFutureDate = (date) => {
  if (!date) return false;

  const inputDate = new Date(date);
  const today = new Date();

  // Compare only date portion, ignoring time
  inputDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  return inputDate > today;
};
