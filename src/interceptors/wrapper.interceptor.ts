import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class WrapperInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((value) => ({
        status: 'success',
        data: value,
      })),
      catchError(async (err) => ({
        status: 'fail',
        data: err.message,
      })),
    );
  }
}
