/* eslint-disable @typescript-eslint/no-var-requires */
const dayjs = require('dayjs');
const { getAllDatesInRange } = require('./getAllDatesInRange');

test('If range is 1 day, only the start date is returned', () => {
  const startDate = dayjs(new Date('2024-06-06T12:00:00.000Z'));
  const endDate = dayjs(new Date('2024-06-07T12:00:00.000Z'));

  expect(getAllDatesInRange(startDate, endDate)).toStrictEqual([startDate]);
});

test('If range is multiple days, only the start date and the dates till the end date are returned', () => {
  const startDate = dayjs(new Date('2024-06-06T12:00:00.000Z'));
  const endDate = dayjs(new Date('2024-06-10T12:00:00.000Z'));

  expect(getAllDatesInRange(startDate, endDate)).toStrictEqual([
    dayjs(new Date('2024-06-06T12:00:00.000Z')),
    dayjs(new Date('2024-06-07T12:00:00.000Z')),
    dayjs(new Date('2024-06-08T12:00:00.000Z')),
    dayjs(new Date('2024-06-09T12:00:00.000Z'))
  ]);
});
