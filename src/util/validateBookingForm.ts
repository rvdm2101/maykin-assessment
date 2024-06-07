import { IBookingForm } from '../types';
import { ErrorObject } from 'ajv';
import ajv from './ajvValidation';
import Swagger from '../../public/resource/swaggerSpec.json';
import dayjs from 'dayjs';

const validate = ajv.compile(Swagger.components.schemas.BookingForm);

export type TValidationErrors = { [key: string]: ErrorObject };

type TValidateBookingForm = (bookingForm: IBookingForm) => {
  valid: boolean;
  errors: TValidationErrors;
};

export const validateBookingForm: TValidateBookingForm = (bookingForm) => {
  validate(bookingForm);
  const errors = validate?.errors || [];
  const arivalDate = dayjs(bookingForm.arivalDate);
  const departureDate = dayjs(bookingForm.departureDate);
  const today = dayjs(new Date()).startOf('day');

  errors.forEach((error) => {
    if (error.instancePath !== '') {
      return;
    }

    if (error.keyword === 'required') {
      errors.push({
        ...error,
        instancePath: `/${error.params.missingProperty}`
      });
    }
  });

  if (arivalDate.isBefore(today)) {
    errors.push({
      instancePath: '/arivalDate',
      keyword: 'format',
      message: 'The arival date cannot be in the past',
      params: {},
      schemaPath: '#/properties/arivalDate'
    });
  }

  if (arivalDate.isAfter(departureDate) || arivalDate.isSame(departureDate)) {
    errors.push({
      instancePath: '/arivalDate',
      keyword: 'format',
      message: 'Must be a date before the departure date',
      params: {},
      schemaPath: '#/properties/arivalDate'
    });
    errors.push({
      instancePath: '/departureDate',
      keyword: 'format',
      message: 'Must be a date after the arival date',
      params: {},
      schemaPath: '#/properties/departureDate'
    });
  }

  return {
    valid: errors.length === 0,
    errors: errors.reduce<TValidationErrors>((carry, error) => {
      const errorField = error.instancePath.slice(1); // Remove the leading '/'
      if (errorField === '' || errorField in carry) {
        return carry;
      }
      carry[errorField] = error;
      return carry;
    }, {})
  };
};
