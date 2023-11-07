import { Controller, Get, Res } from '@nestjs/common';
import { RenderableResponse } from 'nest-next';

@Controller()
export class AppController {
  @Get()
  async homePage(@Res() res: RenderableResponse) {
    return res.render('index');
  }
}
