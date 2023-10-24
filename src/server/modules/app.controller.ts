import { Controller, Get, Response } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { RenderableResponse } from 'nest-next';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  async home(@Response() res: RenderableResponse) {
    return res.render('index');
  }

  @Get('favicon.ico')
  favicon() {
    return {};
  }
}
