import { User } from 'src/user/entities/user.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ApiDocumentation } from '../interfaces/api-documentation';
import serverError from './commonServerError';

const userDocumentation: ApiDocumentation = {
  // ----- Create
  createOkResponse: {
    status: 201,
    description: 'An user has been successfully created',
    type: User,
  },
  createBadResponse: serverError,
  // ----- End Create

  // ----- Get All
  getAllOkResponse: {
    status: 200,
    description: 'Get a list of all users',
    type: Array<User>,
  },
  getAllBadResponse: serverError,
  // ----- End Get All

  // ----- Get By Id
  getByIdOkResponse: {
    status: 200,
    description: 'Get one user info',
    type: User,
  },
  getByIdBadResponse: serverError,
  // ----- End Get By Id

  // ----- Update
  updateOkResponse: {
    status: 200,
    description: 'Update one or more user info',
    type: UpdateResult,
  },
  updateBadResponse: serverError,
  // ----- End Update

  // ----- Remove
  removeOkResult: {
    status: 200,
    description: 'Removed user from the system',
    type: DeleteResult,
  },
  removeBadResult: serverError,
  // ----- End Remove

  // ----- Change Profile Picture
  changeProfilePictureOkResponse: {
    status: 200,
    description: 'Change profile picture',
  },
  changeProfilePictureBadResponse: serverError,
  // ----- End Change Profile Picture

  // ----- Update Profile Picture
  updateProfilePictureOkResponse: {
    status: 200,
    description: 'Update profile picture',
  },
  updateProfilePictureBadResponse: serverError,
  // ----- End Update Profile Picture

  // ----- Remove Profile Picture
  removeProfilePictureOkResponse: {
    status: 200,
    description: 'Remove profile picture',
  },
  removeProfilePictureBadResponse: serverError,
  // ----- End Remove Profile Picture
};

export default userDocumentation;
