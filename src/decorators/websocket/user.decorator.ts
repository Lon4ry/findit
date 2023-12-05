import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Socket } from 'socket.io';
import { UserEntity } from 'src/entities/user.entity';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserEntity => {
    const client: Socket & { request: { user: UserEntity } } = ctx
      .switchToWs()
      .getClient();
    return client.request.user;
  },
);
