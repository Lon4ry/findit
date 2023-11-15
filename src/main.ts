import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { ConfigService } from '@nestjs/config';
import session from 'express-session';
import passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = new ConfigService();

  app.enableCors({
    origin: configService.get('CLIENT_URL'),
  });

  app.use(
    session({
      secret: configService.get('SECRET'),
      saveUninitialized: false,
      resave: false,
      cookie: {
        signed: true,
        maxAge: 60000,
        domain: 'localhost',
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3210);
}
bootstrap().then();
