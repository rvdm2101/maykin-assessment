/* eslint-disable @typescript-eslint/no-var-requires */
const { sortHotelsByIds } = require('./sortHotelsByIds');
const { getEmptyHotel } = require('./emptyObject');

test('Sort hotels by hotelID', () => {
  const hotel1 = getEmptyHotel();
  hotel1.hotelInfo.hotelID = 1;
  const hotel2 = getEmptyHotel();
  hotel2.hotelInfo.hotelID = 2;
  const hotel3 = getEmptyHotel();
  hotel3.hotelInfo.hotelID = 3;

  expect(sortHotelsByIds([3, 1, 2], [hotel1, hotel2, hotel3])).toStrictEqual([
    hotel3,
    hotel1,
    hotel2
  ]);
});
