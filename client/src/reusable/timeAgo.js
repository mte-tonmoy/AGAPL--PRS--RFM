export function timeAgo(dateParam) {
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  const now = new Date();
  now.setHours(now.getHours() - 6);
  const date = new Date(dateParam);
  const secondsAgo = Math.round((now - date.getTime()) / 1000);
  const minutesAgo = Math.round(secondsAgo / 60);
  const hoursAgo = Math.round(minutesAgo / 60);
  const daysAgo = Math.round(hoursAgo / 24);
  const monthsAgo = Math.round(daysAgo / 30);
  const yearsAgo = Math.round(daysAgo / 365);

  if (secondsAgo < 60) {
    return rtf.format(-secondsAgo, "second");
  } else if (minutesAgo < 60) {
    return rtf.format(-minutesAgo, "minute");
  } else if (hoursAgo < 24) {
    return rtf.format(-hoursAgo, "hour");
  } else if (daysAgo < 30) {
    return rtf.format(-daysAgo, "day");
  } else if (monthsAgo < 12) {
    return rtf.format(-monthsAgo, "month");
  } else {
    return rtf.format(-yearsAgo, "year");
  }
}
