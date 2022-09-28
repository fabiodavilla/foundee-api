import { PlaceImage } from 'src/place-images/entities/place-image.entity';
import { DeleteResult } from 'typeorm';
import { ApiDocumentation } from '../interfaces/api-documentation';
import serverError from './commonServerError';

const placeImagesResponse: ApiDocumentation = {
  // ----- Create
  createOkResponse: {
    status: 201,
    description: 'An iamge of a place has been successfully created',
    type: PlaceImage,
  },
  createBadResponse: serverError,
  // ----- End Create

  // ----- Get All
  getAllByPlaceOkResponse: {
    status: 200,
    description: 'Get a list of all place images by place',
    type: Array<PlaceImage>,
  },
  getAllByPlaceBadResponse: serverError,
  // ----- End Get All

  // ----- Get By Id
  getByIdOkResponse: {
    status: 200,
    description: 'Get one place image',
    type: PlaceImage,
  },
  getByIdBadResponse: serverError,
  // ----- End Get By Id

  // ----- Remove
  removeOkResult: {
    status: 200,
    description: 'Removed place from the system',
    type: DeleteResult,
  },
  removeBadResult: serverError,
  // ----- End Remove
};

export default placeImagesResponse;
