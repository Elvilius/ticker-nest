import {
  Controller,
  Get,
  Query,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { TickerService } from '../../services/ticker/ticker.service';
import { TickerDto } from './ticker.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('/ticker')
@ApiTags('тикер')
export class TickerController {
  constructor(private readonly tickerService: TickerService) {}

  @Get()
  @ApiOperation({
    summary: 'Возвращаeт тикер заданной пары с биржи',
  })
  @ApiResponse({ status: HttpStatus.OK })
  async getTicker(@Query() tickerDto: TickerDto) {
    try {
      const normalizedCurrency = this.tickerService.normalizeCurrency(
        tickerDto,
      );
      return await this.tickerService.getTicker(
        normalizedCurrency,
        tickerDto.exchangesId,
      );
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
