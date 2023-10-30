import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { RenderableResponse } from 'nest-next';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { GithubAuthGuard } from './guards/github-auth.guard';
import { AppleAuthGuard } from './guards/apple-auth.guard';
import { YandexAuthGuard } from './guards/yandex-auth.guard';

@Controller('auth')
export class AuthController {
  @Get()
  authPage(@Res() res: RenderableResponse) {
    return res.render('/auth');
  }

  @Get('oauth/apple-auth')
  @UseGuards(AppleAuthGuard)
  appleAuth() {}

  @Get('oauth/apple-callback')
  @UseGuards(AppleAuthGuard)
  appleCallback() {}

  @Get('oauth/google-auth')
  @UseGuards(GoogleAuthGuard)
  googleAuth() {}

  @Get('oauth/google-callback')
  @UseGuards(GoogleAuthGuard)
  googleCallback() {}

  @Get('oauth/yandex-auth')
  @UseGuards(YandexAuthGuard)
  yandexAuth() {}

  @Get('oauth/yandex-callback')
  @UseGuards(YandexAuthGuard)
  yandexCallback() {}

  @Get('oauth/github-auth')
  @UseGuards(GithubAuthGuard)
  githubAuth() {}

  @Get('oauth/github-callback')
  @UseGuards(GithubAuthGuard)
  githubCallback() {}
}
