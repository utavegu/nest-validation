import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseInterceptors,
  UsePipes,
  UseFilters,
  HttpException,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { InformInterceptor } from 'src/interceptors/inform.interceptor';
import { WrapperInterceptor } from 'src/interceptors/wrapper.interceptor';
import { JoiValidationPipe } from '../validation/joi.validation.pipe';
import { userSchema } from 'src/validation/schemas/user.schema';
import { UserDto } from 'src/dto/user.dto';
import { GetUserExceptionFilter } from 'src/exceptions/get.user.exception.filter';

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

  @UseFilters(GetUserExceptionFilter)
  @Get('/user/:id')
  getTargetUser(@Param('id') id: string) {
    if (Number(id) > 5 || Number(id) < 1) {
      throw new HttpException('Такой пользователь не найден!', 404); // Допустим у нас только 5 юзеров
    }
    return `Найден пользователь с идентификатором ${id}`;
  }

  @Post()
  @UsePipes(new JoiValidationPipe(userSchema))
  async create(@Body() body: UserDto) {
    return body;
  }
}
