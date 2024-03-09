import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpCode,
  NotFoundException,
  Put,
  ForbiddenException,
} from '@nestjs/common';
import { UUIDPipe } from 'src/common/pipes/uuid.pipe';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', UUIDPipe) id: string) {
    const user = this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @Put(':id')
  update(
    @Param('id', UUIDPipe) id: string,
    @Body() updateUserPasswordDto: UpdateUserPasswordDto,
  ) {
    const user = this.findOne(id);
    if (updateUserPasswordDto.oldPassword !== user.password) {
      throw new ForbiddenException();
    }
    return this.userService.update(id, {
      password: updateUserPasswordDto.newPassword,
    } as UpdateUserDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', UUIDPipe) id: string) {
    const user = this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }

    return this.userService.remove(id);
  }
}
