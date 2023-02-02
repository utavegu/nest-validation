import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class GetUserExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const errorCode = exception.getStatus();
    const errorMessage = exception.getResponse();

    const errorToDatabase = {
      timestamp: new Date().toISOString(),
      status: 'fail', // Енумка
      data: {
        errorMessage,
        path: request.url,
        method: request.method,
      },
      code: errorCode || 500,
    };

    // асинк-эвэйт база данных.сохранить(errorToDatabase)

    response.status(errorCode).json(errorToDatabase);
  }
}
