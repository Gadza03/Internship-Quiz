import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class LogInDto {
  @ApiProperty({ example: 'username or email' })
  @IsNotEmpty()
  @MinLength(3)
  prompt: string;

  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty({ example: 'test1234' })
  password: string;
}
