import { ApiProperty, PickType } from '@nestjs/swagger';
import { CreateUserDto } from 'user/dto/create-user.dto';

import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto extends PickType(CreateUserDto, [
  'login',
  'password',
]) {}

export class TokenDto {
  accessToken: string;
  refreshToken: string;
}

export class RefreshTokenDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
