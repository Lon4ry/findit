import { Controller, Get, Response } from '@nestjs/common';
import { RenderableResponse } from 'nest-next';

@Controller('auth')
export class AuthController {
  @Get()
  authPage(@Response() res: RenderableResponse) {
    return res.render('/auth');
  }
}
