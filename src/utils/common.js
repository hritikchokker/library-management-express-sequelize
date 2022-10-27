exports.fetchDateFromString = (type = "m", val = 2) => {
  const date = new Date();
  if (type === "m") {
    date.setMinutes(date.getMinutes() + val);
  } else if (type === "d") {
    date.setHours(date.getHours() + val);
  }
  return date.getTime();
};
