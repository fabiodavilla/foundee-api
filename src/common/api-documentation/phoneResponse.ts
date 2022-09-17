import { Phone } from 'src/phone/entities/phone.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ApiDocumentation } from '../interfaces/api-documentation';
import serverError from './commonServerError';

const phoneResponse: ApiDocumentation = {
  // ----- Create
  createOkResponse: {
    status: 201,
    description: 'An phone has been successfully created',
    type: Phone,
  },
  createBadResponse: serverError,
  // ----- End Create

  // ----- Get All
  getAllOkResponse: {
    status: 200,
    description: 'Return a list of phone',
    type: Array<Phone>,
  },
  getAllBadResponse: serverError,
  // ----- End Get All

  // ----- Get By Id
  getOneOkResponse: {
    status: 200,
    description: 'Return one phone by id',
    type: Phone,
  },
  getOneBadResponse: serverError,
  // ----- End Get By Id

  // ----- Get All By User
  getAllByIdOkResponse: {
    status: 200,
    description: 'Return a list of all phones from user',
    type: Array<Phone>,
  },
  getAllByIdBadResponse: serverError,
  // ----- End Get All By User

  // ----- Update
  updateOkResponse: {
    status: 200,
    description: 'Phone updated',
    type: UpdateResult,
  },
  updateBadResponse: serverError,
  // ----- End Update

  // ----- Delete
  removeOkResponse: {
    status: 200,
    description: 'Phone removed',
    type: DeleteResult,
  },
  removeBadResponse: serverError,
  // ----- End Delete
};

export default phoneResponse;
