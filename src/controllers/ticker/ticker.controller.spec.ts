import { TickerService } from '../../services/ticker/ticker.service';
import { TickerController } from './ticker.controller';
import { TickerDto } from './ticker.dto';

describe('TickerController', () => {
  let tickerService: TickerService;
  let tickerController: TickerController;

  beforeEach(() => {
    tickerService = new TickerService();
    tickerController = new TickerController(tickerService);
  });

  describe('ticker', () => {
    it('should return ticker', async () => {
      const tickerDto = new TickerDto();
      tickerDto.firstCurrency = 'BTC';
      tickerDto.secondCurrency = 'UTD';

      expect(tickerController.getTicker(tickerDto)).toEqual(Promise.resolve({}));
    });
  });
});
