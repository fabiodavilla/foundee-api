import { ApiResponseOptions } from '@nestjs/swagger';

export type ApiDocumentation = {
  [key: string]: ApiResponseOptions;
};
