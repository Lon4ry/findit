import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import session from 'express-session';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      secret: new ConfigService().get('SECRET'),
    }),
  );

  await app.listen(80);
}
bootstrap();
