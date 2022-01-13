import { Controller, Get } from 'routing-controllers';

@Controller()
export class DefaultController {
  @Get('/status')
  getStatus(): string {
    return 'OK';
  }
}
