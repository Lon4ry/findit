import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Redirect,
  Req,
  Res,
  Session,
  UseGuards,
} from '@nestjs/common';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { GithubAuthGuard } from './guards/github-auth.guard';
import { AppleAuthGuard } from './guards/apple-auth.guard';
import { YandexAuthGuard } from './guards/yandex-auth.guard';
import { RegistrationDto } from '../../DTOs/auth/registration.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('authenticated')
  async whoAmI(@Req() req: Request, @Res() res: Response) {
    res.send({ user: req.user });
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  async login() {}

  @Post('registration')
  async registration(
    @Body() registrationDto: RegistrationDto,
    @Session() session: Record<string, any>,
  ) {
    return await this.authService.register(registrationDto, session);
  }

  @Get('oauth/apple-auth')
  @UseGuards(AppleAuthGuard)
  async appleAuth() {}

  @Get('oauth/apple-callback')
  @UseGuards(AppleAuthGuard)
  @Redirect('/dashboard')
  async appleCallback() {}

  @Get('oauth/google-auth')
  @UseGuards(GoogleAuthGuard)
  async googleAuth() {}

  @Get('oauth/google-callback')
  @UseGuards(GoogleAuthGuard)
  @Redirect('/dashboard')
  async googleCallback() {}

  @Get('oauth/yandex-auth')
  @UseGuards(YandexAuthGuard)
  async yandexAuth() {}

  @Get('oauth/yandex-callback')
  @UseGuards(YandexAuthGuard)
  @Redirect('/dashboard')
  async yandexCallback() {}

  @Get('oauth/github-auth')
  @UseGuards(GithubAuthGuard)
  async githubAuth() {}

  @Get('oauth/github-callback')
  @UseGuards(GithubAuthGuard)
  @Redirect('/dashboard')
  async githubCallback() {}
}