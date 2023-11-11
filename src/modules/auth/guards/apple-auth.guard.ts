import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AppleAuthGuard extends AuthGuard('apple') {
  async canActivate(context: ExecutionContext) {
    const activate = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    if (request.user.type === 'User') {
      request.user = request.user.payload;
      await super.logIn(request);
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
