import { TickerService } from '../../services/ticker/ticker.service';
import { TickerDto } from '../../controllers/ticker/ticker.dto';

describe('TickerService', () => {
  let tickerService: TickerService;

  beforeEach(() => {
    tickerService = new TickerService();
  });

  describe('normalize currency', () => {
    it('should return normalize currency', async () => {
      const tickerDto = new TickerDto();
      tickerDto.firstCurrency = 'BTC';
      tickerDto.secondCurrency = 'USD';

      expect(tickerService.normalizeCurrency(tickerDto)).toBe('BTC/USD');
    });
  });

  describe('get exchanges', () => {
    it('should return exchanges', async () => {
      const nonexistentExchange = 'nonexistent';
      const existingExchange = 'bitmex';

      expect(tickerService.getExchanges(existingExchange)).toMatchObject({});
      expect(() => tickerService.getExchanges(nonexistentExchange)).toThrow(Error);
    });
  });

  describe('get ticker', () => {
    it('should return ticker', async () => {
      const currency = 'BTC/USD';
      const exchange = 'bitmex';

      expect(tickerService.getTicker(currency, exchange)).toEqual(Promise.resolve({}));
    });
  });
});
