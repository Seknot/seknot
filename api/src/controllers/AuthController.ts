import { Controller, Get } from 'routing-controllers';

@Controller('/login')
export class DefaultController {
  @Get('/status')
  getStatus(): string {
    return 'OK';
  }
}
