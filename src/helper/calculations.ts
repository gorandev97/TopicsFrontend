export const getElapsedTime = (postedDate: string): string => {
  const now = new Date(); // Current date and time
  const posted = new Date(postedDate); // Parse the posted date
  const elapsedMs = now.getTime() - posted.getTime(); // Time difference in milliseconds

  const elapsedHours = elapsedMs / (1000 * 60 * 60); // Convert to hours
  if (elapsedHours > 24) {
    const elapsedDays = Math.floor(elapsedHours / 24); // Convert to days
    return `${elapsedDays} day${elapsedDays > 1 ? "s" : ""} ago`;
  }

  return `${Math.floor(elapsedHours)} hour${
    Math.floor(elapsedHours) !== 1 ? "s" : ""
  } ago`;
};

export function formatNumber(value: number) {
  if (value >= 1_000_000) {
    return (value / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  } else if (value >= 1_000) {
    return (value / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return value?.toString(); // Return the number as-is if it's less than 1,000
}
