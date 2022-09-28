import { ApiDocumentation } from '../interfaces/api-documentation';
import serverError from './commonServerError';

const authResponse: ApiDocumentation = {
  // ----- Login
  removeOkResponse: {
    status: 200,
    description: 'Login route',
  },
  removeBadResponse: serverError,
  // ----- End Login
};

export default authResponse;
