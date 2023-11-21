import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import passport from 'passport';
import { CorsConfig } from './configs/cors.config';
import { sessionInstance } from './configs/session.config';
import { AuthGuard } from './modules/auth/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(CorsConfig);

  app.use(sessionInstance);

  app.use(passport.initialize());
  app.use(passport.session());

  app.useGlobalGuards(new AuthGuard());

  await app.listen(3210);
}
bootstrap().then();
