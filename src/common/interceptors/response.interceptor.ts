import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { createResponse } from '../CommonResponse';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map((data) => createResponse(true, response.statusCode, '', data)),
      catchError((error) => {
        if (error instanceof HttpException) {
          response.statusCode = error.getStatus();
          return Promise.resolve(
            createResponse(false, error.getStatus(), error.message, null),
          );
        }

        response.statusCode = 500;
        return Promise.resolve(
          createResponse(false, 500, 'Internal server error', null),
        );
      }),
    );
  }
}
