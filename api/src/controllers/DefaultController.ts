import { Controller, UseBefore, Get } from 'routing-controllers';
import cors from 'cors';
@Controller('/info')
@UseBefore(cors())
export class DefaultController {
  @Get('/status')
  getStatus(): string {
    return 'OK';
  }
}
