import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenBody {
  @IsNotEmpty()
  @ApiProperty()
  refreshToken: string;
}
