import {
  CallHandler,
  Injectable,
  NestInterceptor,
  ExecutionContext,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class InformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap(() => {
        // eslint-disable-next-line prettier/prettier
        console.log(`\nМетод ${context.getHandler().name} был вызван в контроллере ${context.getClass().name}`);
      }),
    );
  }
}
