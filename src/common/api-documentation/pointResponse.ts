import { Point } from 'src/point/entities/point.entity';
import { ApiDocumentation } from '../interfaces/api-documentation';
import serverError from './commonServerError';

const pointResponse: ApiDocumentation = {
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
};

export default pointResponse;
