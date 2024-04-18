import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateUserPasswordDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: "The user's old password",
  })
  oldPassword: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: "The user's new password",
  })
  newPassword: string;
}
