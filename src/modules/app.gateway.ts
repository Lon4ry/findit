import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import passport from 'passport';
import { sessionInstance } from '../configs/session.config';
import { CorsConfig } from '../configs/cors.config';
import { UserEntity } from '../entities/user.entity';

@WebSocketGateway({ cors: CorsConfig })
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor() {}

  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    const wrap =
      (middleware: (...args: any[]) => any) =>
      (socket: Socket, next: (...args: any[]) => void) =>
        middleware(socket.request, {}, next);
    server.use(wrap(sessionInstance));
    server.use(wrap(passport.initialize()));
    server.use(wrap(passport.session()));
    server.use((socket: Socket & { request: Express.Request }, next) => {
      if (socket.request.isAuthenticated()) {
        next();
      } else {
        next(new Error('Unauthorized'));
      }
    });
  }

  handleConnection(
    @ConnectedSocket() client: Socket & { request: { user: UserEntity } },
  ) {
    console.log(`Connected ${client.id}`);
  }

  handleDisconnect(
    @ConnectedSocket() client: Socket & { request: { user: UserEntity } },
  ) {
    console.log(`Disconnected: ${client.id}`);
  }
}
