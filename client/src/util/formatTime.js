function formatTimeForEAT(dateToFormat) {
  const date = new Date(dateToFormat);
  date.setHours(date.getHours() + 3); // Adjust for EAT time zone

  const formattedTime = date.toISOString().slice(0, 16);

  return formattedTime;
}

export { formatTimeForEAT };
