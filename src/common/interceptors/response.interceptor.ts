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
          return Promise.resolve(
            createResponse(false, response.statusCode, error.message, null),
          );
        }
        return Promise.resolve(
          createResponse(
            false,
            response.statusCode,
            'Internal server error',
            null,
          ),
        );
      }),
    );
  }
}
