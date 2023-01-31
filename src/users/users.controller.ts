import {
  Controller,
  Get,
  ParseIntPipe,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { InformInterceptor } from 'src/interceptors/inform.interceptor';
import { WrapperInterceptor } from 'src/interceptors/wrapper.interceptor';

@UseInterceptors(InformInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseInterceptors(WrapperInterceptor)
  @Get()
  getAllUsers(): string[] {
    // Искусственно создаём ошибку в 25% случаев, чтобы потестить перехват ошибок в интерсепторе
    if (Math.random() > 0.75) {
      throw new Error('Специально-сгеренированная ошибка');
    }
    return this.userService.getUsers();
  }

  @Get('/user')
  findOne(@Query('id', ParseIntPipe) id: number) {
    return `Найден пользователь с идентификатором ${id}`;
  }
}
