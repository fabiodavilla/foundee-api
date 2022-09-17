import { ApiResponseOptions } from '@nestjs/swagger';

const serverError: ApiResponseOptions = {
  status: 500,
  description: 'Server Error',
};

export default serverError;
