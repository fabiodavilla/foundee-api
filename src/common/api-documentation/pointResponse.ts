import { Point } from 'src/point/entities/point.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ApiDocumentation } from '../interfaces/api-documentation';
import serverError from './commonServerError';

const pointResponse: ApiDocumentation = {
  // ----- Create
  createOkResponse: {
    status: 201,
    description: 'An point has been successfully created',
    type: Point,
  },
  createBadResponse: serverError,
  // ----- End Create

  // ----- Get Square
  getSquareOkResponse: {
    status: 200,
    description: 'Return the points of the area',
    type: Array<Point>,
  },
  getSquareBadResponse: serverError,
  // ----- End Get Square

  // ----- Get By User
  getByUserOkResponse: {
    status: 200,
    description: 'Return the points of the informed user',
    type: Array<Point>,
  },
  getByUserBadResponse: serverError,
  // ----- End Get By User

  // ----- Update
  updateOkResponse: {
    status: 200,
    description: 'Update the point',
    type: UpdateResult,
  },
  updateBadResponse: serverError,
  // ----- End Update

  // ----- Remove
  removeOkResponse: {
    status: 200,
    description: 'Remove the point',
    type: DeleteResult,
  },
  removeBadResponse: serverError,
  // ----- End Remove
};

export default pointResponse;
