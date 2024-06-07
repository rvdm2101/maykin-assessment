/* eslint-disable @typescript-eslint/no-var-requires */
const dayjs = require('dayjs');
const { validateBookingForm } = require('./validateBookingForm');
const { getEmptyBookingForm } = require('./emptyObject');
const { YMD } = require('./dateFormats');

const dummyForm = () => {
  const form = getEmptyBookingForm();
  const arivalDate = dayjs(new Date()).startOf('day');
  const departureDate = dayjs(arivalDate).add(1, 'day');
  form.hotelID = '123';
  form.roomID = '123';
  form.firstName = 'test';
  form.lastName = 'test';
  form.emailAddress = 'test@test.com';
  form.arivalDate = arivalDate.format(YMD);
  form.departureDate = departureDate.format(YMD);
  return form;
};

test('A correctly filled in form doenst result in any errors', () => {
  const form = dummyForm();
  const { valid, errors } = validateBookingForm(form);

  expect(valid).toBe(true);
  expect(errors).toStrictEqual({});
});

test('All fields are required', () => {
  const { valid, errors } = validateBookingForm({});

  expect(valid).toBe(false);
  expect(errors).toStrictEqual({
    hotelID: {
      instancePath: '/hotelID',
      schemaPath: '#/required',
      keyword: 'required',
      params: { missingProperty: 'hotelID' },
      message: "must have required property 'hotelID'"
    },
    roomID: {
      instancePath: '/roomID',
      schemaPath: '#/required',
      keyword: 'required',
      params: { missingProperty: 'roomID' },
      message: "must have required property 'roomID'"
    },
    firstName: {
      instancePath: '/firstName',
      schemaPath: '#/required',
      keyword: 'required',
      params: { missingProperty: 'firstName' },
      message: "must have required property 'firstName'"
    },
    lastName: {
      instancePath: '/lastName',
      schemaPath: '#/required',
      keyword: 'required',
      params: { missingProperty: 'lastName' },
      message: "must have required property 'lastName'"
    },
    emailAddress: {
      instancePath: '/emailAddress',
      schemaPath: '#/required',
      keyword: 'required',
      params: { missingProperty: 'emailAddress' },
      message: "must have required property 'emailAddress'"
    },
    amountOfRooms: {
      instancePath: '/amountOfRooms',
      schemaPath: '#/required',
      keyword: 'required',
      params: { missingProperty: 'amountOfRooms' },
      message: "must have required property 'amountOfRooms'"
    },
    amountOfGuests: {
      instancePath: '/amountOfGuests',
      schemaPath: '#/required',
      keyword: 'required',
      params: { missingProperty: 'amountOfGuests' },
      message: "must have required property 'amountOfGuests'"
    },
    arivalDate: {
      instancePath: '/arivalDate',
      schemaPath: '#/required',
      keyword: 'required',
      params: { missingProperty: 'arivalDate' },
      message: "must have required property 'arivalDate'"
    },
    departureDate: {
      instancePath: '/departureDate',
      schemaPath: '#/required',
      keyword: 'required',
      params: { missingProperty: 'departureDate' },
      message: "must have required property 'departureDate'"
    }
  });
});

test('EmailAddress must follow email address rules', () => {
  const form = dummyForm();
  form.emailAddress = 'test';
  const { valid, errors } = validateBookingForm(form);

  expect(valid).toBe(false);
  expect(errors).toStrictEqual({
    emailAddress: {
      instancePath: '/emailAddress',
      keyword: 'format',
      message: 'must match format "email"',
      params: {
        format: 'email'
      },
      schemaPath: '#/properties/emailAddress/format'
    }
  });
});

test('AmountOfGuests and amountOfRooms have to be greater than 1', () => {
  const form = dummyForm();
  form.amountOfGuests = 0;
  form.amountOfRooms = -5;
  const { valid, errors } = validateBookingForm(form);

  expect(valid).toBe(false);
  expect(errors).toStrictEqual({
    amountOfGuests: {
      instancePath: '/amountOfGuests',
      keyword: 'minimum',
      message: 'must be >= 1',
      params: {
        comparison: '>=',
        limit: 1
      },
      schemaPath: '#/properties/amountOfGuests/minimum'
    },
    amountOfRooms: {
      instancePath: '/amountOfRooms',
      keyword: 'minimum',
      message: 'must be >= 1',
      params: {
        comparison: '>=',
        limit: 1
      },
      schemaPath: '#/properties/amountOfRooms/minimum'
    }
  });
});

test('ArivalDate has to be today, or in the future', () => {
  const form = dummyForm();
  const arivalDate = dayjs(new Date()).startOf('day').subtract(6, 'day');
  form.arivalDate = arivalDate.format(YMD);
  const { valid, errors } = validateBookingForm(form);

  expect(valid).toBe(false);
  expect(errors).toStrictEqual({
    arivalDate: {
      instancePath: '/arivalDate',
      keyword: 'format',
      message: 'The arival date cannot be in the past',
      params: {},
      schemaPath: '#/properties/arivalDate'
    }
  });
});

test('ArivalDate has to be before the departureDate', () => {
  const form = dummyForm();
  const arivalDate = dayjs(new Date()).startOf('day').add(1, 'day');
  const departureDate = dayjs(new Date()).startOf('day');
  form.arivalDate = arivalDate.format(YMD);
  form.departureDate = departureDate.format(YMD);
  const { valid, errors } = validateBookingForm(form);

  expect(valid).toBe(false);
  expect(errors).toStrictEqual({
    arivalDate: {
      instancePath: '/arivalDate',
      keyword: 'format',
      message: 'Must be a date before the departure date',
      params: {},
      schemaPath: '#/properties/arivalDate'
    },
    departureDate: {
      instancePath: '/departureDate',
      keyword: 'format',
      message: 'Must be a date after the arival date',
      params: {},
      schemaPath: '#/properties/departureDate'
    }
  });
});
