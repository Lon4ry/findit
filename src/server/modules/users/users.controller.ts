import { Controller, Get, Res } from '@nestjs/common';
import { RenderableResponse } from 'nest-next';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('dashboard')
  async dashboardPage(@Res() res: RenderableResponse) {
    return res.render('dashboard');
  }
}
