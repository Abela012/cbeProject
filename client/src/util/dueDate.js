import { differenceInDays, format } from "date-fns";

function calcDaysUntilDue(date, now) {
  const dueDate = new Date(date);

  const daysUntilDue = differenceInDays(dueDate, now);
  if (daysUntilDue >= 0 && daysUntilDue <= 3) {
    // Display notification using your preferred method
    // alert(`Task title is due in ${format(dueDate, "MMMM Do YYY, h:mm a")}.`);
    return daysUntilDue;
  }
  return "";
}

export { calcDaysUntilDue };
