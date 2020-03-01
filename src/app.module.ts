import { Module } from '@nestjs/common';
import { TickerModule } from './services/ticker/ticker.module';
import { TickerController } from './controllers/ticker/ticker.controller';

@Module({
  imports: [TickerModule],
  controllers: [TickerController],
})
export class AppModule {}
