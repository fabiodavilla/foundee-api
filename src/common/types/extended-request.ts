import { Request } from 'express';

export type ExtendedRequest = Request & {
  userObject: { idUser: string; email: string };
};
