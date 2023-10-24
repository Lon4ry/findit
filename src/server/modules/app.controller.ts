import { Controller, Get, Response } from '@nestjs/common';
import { RenderableResponse } from 'nest-next';

@Controller()
export class AppController {
  @Get()
  homePage(@Response() res: RenderableResponse) {
    return res.render('index');
  }
}
