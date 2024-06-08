export const getCurrentDateBasedOnLocale = (locale: string) => {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return formatter.format(now);
};
