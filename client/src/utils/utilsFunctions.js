export const randomDate = (start, end) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

export const capitalizeFirstLetter = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const calcDateDiff = (date1, date2) => {
  return Math.abs(Math.floor((date1 - date2) / (60 * 60 * 24 * 1000)));
};
