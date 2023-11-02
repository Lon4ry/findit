import { Controller, Get, Res } from '@nestjs/common';
import { RenderableResponse } from 'nest-next';

@Controller()
export class UsersController {
  @Get('dashboard')
  dashboardPage(@Res() res: RenderableResponse) {
    return res.render('dashboard');
  }
}
