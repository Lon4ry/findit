import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
  async canActivate(context: ExecutionContext) {
    const activate = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    if (request.user.type === 'User') {
      request.user = request.user.payload;
      await super.logIn(request);
      response.redirect('/dashboard');
    } else {
      const defaultValues = request.user.payload;
      const query = defaultValues
        ? `/?data=${JSON.stringify(defaultValues)}`
        : '';
      response.redirect('/auth/registration' + query);
    }
    return activate;
  }
}
