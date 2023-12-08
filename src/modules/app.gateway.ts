import {
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import passport from 'passport';
import { Server, Socket } from 'socket.io';
import { authMiddleware } from 'src/middlewares/websocket/auth.middleware';
import { CorsConfig } from '../configs/cors.config';
import { sessionInstance } from '../configs/session.instance';

@WebSocketGateway({ cors: CorsConfig })
export class AppGateway implements OnGatewayInit {
  @WebSocketServer() server: Server;

  async afterInit(server: Server): Promise<void> {
    const wrap =
      (middleware: (...args: any[]) => any) =>
      (socket: Socket, next: (...args: any[]) => void) =>
        middleware(socket.request, {}, next);
    server.use(wrap(sessionInstance));
    server.use(wrap(passport.initialize()));
    server.use(wrap(passport.session()));
    server.use(wrap(authMiddleware));
  }
}
