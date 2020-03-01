import { Injectable } from '@nestjs/common';
import * as ccxt from 'ccxt';
import { TickerDto } from 'dist/controllers/ticker/ticker.dto';
import { Exchange, Ticker } from 'ccxt';

@Injectable()
export class TickerService {
  async getTicker(symbol: string, exchangesId: string): Promise<Ticker> {
    const exchanges = this.getExchanges(exchangesId);
    return exchanges.fetchTicker(symbol);
  }

  normalizeCurrency(tickerDto: TickerDto): string {
    const { firstCurrency, secondCurrency } = tickerDto;
    return `${firstCurrency}/${secondCurrency}`;
  }

  private getExchanges(exchangesId: string): Exchange {
    try {
      return new ccxt[exchangesId]();
    } catch (e) {
      throw new Error(`Биржи ${exchangesId} не найдено`);
    }
  }
}
