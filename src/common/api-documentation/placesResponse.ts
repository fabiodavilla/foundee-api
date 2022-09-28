import { Place } from 'src/places/entities/place.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ApiDocumentation } from '../interfaces/api-documentation';
import serverError from './commonServerError';

const placesResponse: ApiDocumentation = {
  // ----- Create
  createOkResponse: {
    status: 201,
    description: 'An place has been successfully created',
    type: Place,
  },
  createBadResponse: serverError,
  // ----- End Create

  // ----- Get All
  getAllOkResponse: {
    status: 200,
    description: 'Get a list of all place',
    type: Array<Place>,
  },
  getAllBadResponse: serverError,
  // ----- End Get All

  // ----- Get By Id
  getByIdOkResponse: {
    status: 200,
    description: 'Get one place',
    type: Place,
  },
  getByIdBadResponse: serverError,
  // ----- End Get By Id

  // ----- Get By Id
  getByCommercialInfoOkResponse: {
    status: 200,
    description: 'Get one place by commercial info',
    type: Place,
  },
  getByCommercialInfoBadResponse: serverError,
  // ----- End Get By Id

  // ----- Update
  updateOkResponse: {
    status: 200,
    description: 'Update one place',
    type: UpdateResult,
  },
  updateBadResponse: serverError,
  // ----- End Update

  // ----- Remove
  removeOkResult: {
    status: 200,
    description: 'Removed place from the system',
    type: DeleteResult,
  },
  removeBadResult: serverError,
  // ----- End Remove
};

export default placesResponse;
