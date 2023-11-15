import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
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
import { Response } from 'express';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { User } from '../../decorators/user.decorator';
import { UserEntity } from '../../entities/user.entity';

const configService: ConfigService = new ConfigService();

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  async whoAmI(@User() user: UserEntity): Promise<{ user: UserEntity | null }> {
    return { user: user ? user : null };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  async login(): Promise<void> {}

  @Post('registration')
  async registration(
    @Body() registrationDto: RegistrationDto,
    @Session() session: Record<string, any>,
  ): Promise<void> {
    return await this.authService.register(registrationDto, session);
  }

  @Get('oauth/apple-auth')
  @UseGuards(AppleAuthGuard)
  async appleAuth(): Promise<void> {}

  @Get('oauth/apple-callback')
  @UseGuards(AppleAuthGuard)
  async appleCallback(@Res() res: Response): Promise<void> {
    return res.redirect(`${configService.get('CLIENT_URL')}/dashboard`);
  }

  @Get('oauth/google-auth')
  @UseGuards(GoogleAuthGuard)
  async googleAuth(): Promise<void> {}

  @Get('oauth/google-callback')
  @UseGuards(GoogleAuthGuard)
  async googleCallback(@Res() res: Response): Promise<void> {
    return res.redirect(`${configService.get('CLIENT_URL')}/dashboard`);
  }

  @Get('oauth/yandex-auth')
  @UseGuards(YandexAuthGuard)
  async yandexAuth(): Promise<void> {}

  @Get('oauth/yandex-callback')
  @UseGuards(YandexAuthGuard)
  async yandexCallback(@Res() res: Response): Promise<void> {
    return res.redirect(`${configService.get('CLIENT_URL')}/dashboard`);
  }

  @Get('oauth/github-auth')
  @UseGuards(GithubAuthGuard)
  async githubAuth(): Promise<void> {}

  @Get('oauth/github-callback')
  @UseGuards(GithubAuthGuard)
  async githubCallback(@Res() res: Response): Promise<void> {
    return res.redirect(`${configService.get('CLIENT_URL')}/dashboard`);
  }
}
