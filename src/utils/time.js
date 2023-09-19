export function timePassedFromTimestamp(timestamp) {
  const now = Date.now();
  const then = new Date(timestamp).valueOf();

  const secondsAgo = Math.floor((now - then) / 1000);
  const minutesAgo = Math.floor(secondsAgo / 60);
  const hoursAgo = Math.floor(minutesAgo / 60);
  const daysAgo = Math.floor(hoursAgo / 24);
  const monthsAgo = Math.floor(daysAgo / 30);
  const yearsAgo = Math.floor(monthsAgo / 12);

  if (yearsAgo > 0) {
    return yearsAgo === 1 ? "a year ago" : `${yearsAgo} years ago`;
  } else if (monthsAgo > 0) {
    return monthsAgo === 1 ? "a month ago" : `${monthsAgo} months ago`;
  } else if (daysAgo > 0) {
    return daysAgo === 1 ? "a day ago" : `${daysAgo} days ago`;
  } else if (hoursAgo > 0) {
    return hoursAgo === 1 ? "an hour ago" : `${hoursAgo} hours ago`;
  } else if (minutesAgo > 0) {
    return minutesAgo === 1 ? "a minute ago" : `${minutesAgo} minutes ago`;
  } else {
    return secondsAgo === 1 ? "a second ago" : `${secondsAgo} seconds ago`;
  }
}
