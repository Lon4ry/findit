import { Controller, Get, Res } from '@nestjs/common';
import { RenderableResponse } from 'nest-next';

@Controller()
export class AppController {
  @Get()
  homePage(@Res() res: RenderableResponse) {
    return res.render('index');
  }
}
