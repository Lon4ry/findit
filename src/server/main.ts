import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { ConfigService } from '@nestjs/config';
import session from 'express-session';
import passport from 'passport';
import { RenderService } from 'nest-next';
import { ParamsInterceptor } from './interceptors/params.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const renderService = app.get(RenderService);
  renderService.setErrorHandler(
    async (err: any, req: any, res: any, pathname: any, query) => {
      res.send(err.response);
    },
  );

  app.use(
    session({
      secret: new ConfigService().get('SECRET'),
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 60000,
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.useGlobalInterceptors(new ParamsInterceptor());

  await app.listen(80);

  // TODO: Profile pages
}
bootstrap();
