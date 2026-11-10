export function formatDate(
  date: Date | string,
  options: Intl.DateTimeFormatOptions = { month: "long", year: "numeric" },
) {
  return new Intl.DateTimeFormat("en", options).format(new Date(date));
}

