import {
  Body,
  Controller,
  ForbiddenException,
  HttpCode,
  PipeTransform,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { Public } from './auth.decorator';
import { AuthService } from './auth.service';
import { LoginUserDto, RefreshTokenDto, TokenDto } from './dto/auth.dto';
import { UserService } from 'user/user.service';
import { CreateUserDto } from 'user/dto/create-user.dto';
import { User } from 'user/user.entity';

@Public()
@Controller('auth')
@ApiTags('Auth')
@ApiUnauthorizedResponse()
export class AuthController {
  constructor(
    protected authService: AuthService,
    protected userService: UserService,
  ) {}

  @Post('signup')
  @HttpCode(201)
  @ApiOperation({ summary: 'User Sign Up' })
  @ApiResponse({ status: 201, description: 'Registered' })
  @ApiResponse({ status: 400 })
  async sign(@Body() createUserDto: CreateUserDto): Promise<User> {
    return (
      (await this.userService.findByLogin(createUserDto.login)) ||
      this.userService.create(createUserDto)
    );
  }

  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'User Sign In' })
  @ApiResponse({ status: 200, type: TokenDto })
  @ApiResponse({ status: 400 })
  @ApiResponse({ status: 403, description: 'Wrong Credentials' })
  async login(@Body() loginUserDto: LoginUserDto): Promise<TokenDto> {
    const user = await this.userService.findByLogin(loginUserDto.login);
    if (!user || user.password !== loginUserDto.password) {
      throw new ForbiddenException();
    }

    return {
      accessToken: this.authService.generateToken(user),
      refreshToken: this.authService.generateRefreshToken(user),
    };
  }

  @Post('refresh')
  @HttpCode(200)
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      errorHttpStatusCode: 401,
      groups: ['unauthorized'],
    }),
  )
  @ApiOperation({ summary: 'Refresh Token' })
  @ApiBody({ type: RefreshTokenDto })
  @ApiResponse({ status: 200, type: TokenDto })
  async refresh(@Body() refreshTokenDto: RefreshTokenDto): Promise<TokenDto> {
    const id = this.authService.verifyToken(refreshTokenDto.refreshToken);

    if (id) {
      const user = await this.userService.findOne(id);
      if (!user) {
        throw new ForbiddenException();
      }
      this.authService.revokeToken(refreshTokenDto.refreshToken);

      return {
        accessToken: this.authService.generateToken(user),
        refreshToken: this.authService.generateRefreshToken(user),
      };
    }

    throw new ForbiddenException();
  }
}
