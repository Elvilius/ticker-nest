import { IsString, IsNotEmpty, IsOptional, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { normalizeCurrency } from '../../services/utils/utils';

export class TickerDto {
  @Transform(normalizeCurrency)
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Первая валюта', type: String })
  firstCurrency: string;

  @Transform(normalizeCurrency)
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Вторая валюта', type: String })
  secondCurrency: string;

  @IsString()
  @IsIn(['bitmex', 'coinbasepro'])
  @IsOptional()
  @ApiProperty({
    description: 'Название бирже',
    type: String,
    default: 'bitmex',
  })
  exchangesId: string = 'bitmex';
}
