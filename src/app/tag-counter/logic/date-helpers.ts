interface DateRange {
  startDate: Date;
  endDate: Date;
  formatDateRange: () => string;
}

export function getPreviousWeekRange(): DateRange {
  const currentDate = new Date();
  // Get start of previous week (Monday)
  const startDate = new Date(currentDate);
  startDate.setDate(
    currentDate.getDate() - ((currentDate.getDay() + 6) % 7) - 7
  );
  // Get end of previous week (Sunday)
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);

  return {
    startDate,
    endDate,
    formatDateRange: () =>
      `${startDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })} → ${endDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })}`,
  };
}
