import { Dayjs } from 'dayjs';

export const getAllDatesInRange = (startDate: Dayjs, endDate: Dayjs) => {
  const range = [];
  let date = startDate;
  while (date.isBefore(endDate)) {
    range.push(date);
    date = date.add(1, 'day');
  }
  return range;
};
