import { CommercialInfo } from 'src/commercial-info/entities/commercial-info.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ApiDocumentation } from '../interfaces/api-documentation';
import serverError from './commonServerError';

const commercialInfoDocumentation: ApiDocumentation = {
  // ----- Create
  createOkResponse: {
    status: 201,
    description: 'An commercial info has been successfully created',
    type: CommercialInfo,
  },
  createBadResponse: serverError,
  // ----- End Create

  // ----- Get All
  getAllOkResponse: {
    status: 200,
    description: 'Get a list of all commercial info',
    type: Array<CommercialInfo>,
  },
  getAllBadResponse: serverError,
  // ----- End Get All

  // ----- Get By Id
  getByIdOkResponse: {
    status: 200,
    description: 'Get one commercial info',
    type: CommercialInfo,
  },
  getByIdBadResponse: serverError,
  // ----- End Get By Id

  // ----- Get By Id
  getByUserOkResponse: {
    status: 200,
    description: 'Get one commercial info by user',
    type: CommercialInfo,
  },
  getByUserBadResponse: serverError,
  // ----- End Get By Id

  // ----- Update
  updateOkResponse: {
    status: 200,
    description: 'Update one commercial info',
    type: UpdateResult,
  },
  updateBadResponse: serverError,
  // ----- End Update

  // ----- Remove
  removeOkResult: {
    status: 200,
    description: 'Removed commercial info from the system',
    type: DeleteResult,
  },
  removeBadResult: serverError,
  // ----- End Remove
};

export default commercialInfoDocumentation;
