import { Module } from '@nestjs/common';
import { TickerService } from './ticker.service';

@Module({
  imports: [],
  providers: [TickerService],
  exports: [TickerService],
})
export class TickerModule {}
