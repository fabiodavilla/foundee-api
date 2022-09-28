import { PlaceComment } from 'src/place-comments/entities/place-comment.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ApiDocumentation } from '../interfaces/api-documentation';
import serverError from './commonServerError';

const placeCommentsResponse: ApiDocumentation = {
  // ----- Create
  createOkResponse: {
    status: 201,
    description: 'An place comment has been successfully created',
    type: PlaceComment,
  },
  createBadResponse: serverError,
  // ----- End Create

  // ----- Get By Id
  getByIdOkResponse: {
    status: 200,
    description: 'Get one place comment',
    type: PlaceComment,
  },
  getByIdBadResponse: serverError,
  // ----- End Get By Id

  // ----- Get By Place
  getByPlaceOkResponse: {
    status: 200,
    description: 'Get a list of place comments by place',
    type: Array<PlaceComment>,
  },
  getByPlaceBadResponse: serverError,
  // ----- End Get By Place

  // ----- Get By Id
  getByUserOkResponse: {
    status: 200,
    description: 'Get a list of place comments by user',
    type: Array<PlaceComment>,
  },
  getByUserBadResponse: serverError,
  // ----- End Get By Id

  // ----- Update
  updateOkResponse: {
    status: 200,
    description: 'Update one place comment',
    type: UpdateResult,
  },
  updateBadResponse: serverError,
  // ----- End Update

  // ----- Remove
  removeOkResult: {
    status: 200,
    description: 'Removed place comment from the system',
    type: DeleteResult,
  },
  removeBadResult: serverError,
  // ----- End Remove
};

export default placeCommentsResponse;
