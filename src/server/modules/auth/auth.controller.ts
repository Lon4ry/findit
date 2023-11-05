import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { RenderableResponse } from 'nest-next';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { GithubAuthGuard } from './guards/github-auth.guard';
import { AppleAuthGuard } from './guards/apple-auth.guard';
import { YandexAuthGuard } from './guards/yandex-auth.guard';
import { RegistrationDto } from '../../DTOs/auth/registration.dto';
import { UsersService } from '../users/users.service';
import { ProfilesService } from '../profiles/profiles.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly profilesService: ProfilesService,
  ) {}

  @Get('login')
  loginPage(@Res() res: RenderableResponse) {
    return res.render('/auth/login');
  }
  @Get('registration')
  registrationPage(@Res() res: RenderableResponse) {
    return res.render('/auth/registration');
  }

  @Post('registration')
  async registration(@Body() registrationDto: RegistrationDto) {
    const user = await this.usersService.create(registrationDto.user);
    await this.profilesService.create({
      ...registrationDto.profile,
      user: user,
    });
  }

  // TODO: Redirect
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
