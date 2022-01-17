import { Controller, Get } from 'routing-controllers';

@Controller('/info')
export class DefaultController {
  @Get('/status')
  getStatus(): string {
    return 'OK';
  }
}
