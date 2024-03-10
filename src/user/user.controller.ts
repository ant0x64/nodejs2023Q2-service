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
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UUIDPipe } from 'src/common/pipes/uuid.pipe';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User } from './entities/user.entity';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been created.',
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: 'Does not contain required fields',
  })
  create(@Body() createUserDto: CreateUserDto): User {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single user by id' })
  @ApiParam({
    name: 'id',
    format: 'uuid',
    description: 'The ID of the user',
  })
  @ApiResponse({ status: 200, type: User })
  @ApiResponse({ status: 400, description: 'ID has invalid format' })
  @ApiResponse({ status: 404, description: 'User not found' })
  findOne(@Param('id', UUIDPipe) id: string) {
    const user = this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user password' })
  @ApiParam({
    name: 'id',
    format: 'uuid',
    description: 'The ID of the user',
  })
  @ApiResponse({ status: 200, type: User })
  @ApiResponse({ status: 400, description: 'ID has invalid format' })
  @ApiResponse({ status: 403, description: 'Old password is wrong' })
  @ApiResponse({ status: 404, description: 'User not found' })
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
  @ApiOperation({ summary: 'Delete user' })
  @ApiParam({
    name: 'id',
    format: 'uuid',
    description: 'The ID of the user',
  })
  @ApiResponse({ status: 204, description: 'Successful' })
  @ApiResponse({ status: 400, description: 'ID has invalid format' })
  @ApiResponse({ status: 404, description: 'User not found' })
  remove(@Param('id', UUIDPipe) id: string) {
    const user = this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }

    return this.userService.remove(id);
  }
}
