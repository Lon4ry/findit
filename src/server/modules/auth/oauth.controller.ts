import { Controller, Get, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './guards/google-auth.guard';

@Controller('auth/oauth')
export class OAuthController {
  @Get('google-auth')
  @UseGuards(GoogleAuthGuard)
  googleAuth() {}

  @Get('google-callback')
  @UseGuards(GoogleAuthGuard)
  googleCallback() {}
}
