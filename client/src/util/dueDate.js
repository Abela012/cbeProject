import { differenceInDays, format, isAfter } from "date-fns";

function calcDaysUntilDue(date) {
  const now = new Date();
  const dueDate = new Date(date);

  // Calculate days passed
  const daysPassed = differenceInDays(now, dueDate);

  // Calculate days remaining
  const daysRemaining = isAfter(now, dueDate)
    ? 0
    : differenceInDays(dueDate, now);

  return {
    daysPassed: daysPassed >= 0 ? daysPassed : 0, // Ensure non-negative
    daysRemaining: daysRemaining,
    targetDate: format(dueDate, "MMMM d, yyyy"), // Format the target date for output
  };
}

export { calcDaysUntilDue };
