import { User } from 'src/user/entities/user.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ApiDocumentation } from '../interfaces/api-documentation';

const userDocumentation: ApiDocumentation = {
  // ----- Create
  createOkResponse: {
    status: 201,
    description: 'An user has been successfully created',
    type: User,
  },
  createBadResponse: {
    status: 500,
    description: 'An information is incorrect',
  },
  // ----- End Create

  // ----- Get All
  getAllOkResponse: {
    status: 200,
    description: 'Get a list of all users',
    type: Array<User>,
  },
  getAllBadResponse: {
    status: 500,
    description: 'Server error',
  },
  // ----- End Get All

  // ----- Get By Id
  getByIdOkResponse: {
    status: 200,
    description: 'Get one user info',
    type: User,
  },
  getByIdBadResponse: {
    status: 500,
    description: 'Server error',
  },
  // ----- End Get By Id

  // ----- Update
  updateOkResponse: {
    status: 200,
    description: 'Update one or more user info',
    type: UpdateResult,
  },
  updateBadResponse: {
    status: 500,
    description: 'Server error',
  },
  // ----- End Update

  // ----- Remove
  removeOkResult: {
    status: 200,
    description: 'Removed user from the system',
    type: DeleteResult,
  },
  removeBadResult: {
    status: 500,
    description: 'Server error',
  },
  // ----- End Remove

  // ----- Change Profile Picture
  changeProfilePictureOkResponse: {
    status: 200,
    description: 'Change profile picture',
  },
  changeProfilePictureBadResponse: {
    status: 500,
    description: 'Server error',
  },
  // ----- End Change Profile Picture

  // ----- Update Profile Picture
  updateProfilePictureOkResponse: {
    status: 200,
    description: 'Update profile picture',
  },
  updateProfilePictureBadResponse: {
    status: 500,
    description: 'Server error',
  },
  // ----- End Update Profile Picture

  // ----- Remove Profile Picture
  removeProfilePictureOkResponse: {
    status: 200,
    description: 'Remove profile picture',
  },
  removeProfilePictureBadResponse: {
    status: 500,
    description: 'Server error',
  },
  // ----- End Remove Profile Picture
};

export default userDocumentation;
