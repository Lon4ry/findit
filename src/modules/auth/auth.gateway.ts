import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { User } from 'src/decorators/websocket/user.decorator';
import { CorsConfig } from '../../configs/cors.config';
import { UserEntity } from '../../entities/user.entity';
import { AppGateway } from '../app.gateway';
import { AuthService } from './auth.service';

@WebSocketGateway({ namespace: 'auth', cors: CorsConfig })
export class AuthGateway
  extends AppGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly authService: AuthService) {
    super();
  }

  async afterInit(server: Server): Promise<void> {
    super.afterInit(server);
  }

  @SubscribeMessage('connection')
  async handleConnection(
    @ConnectedSocket() client: Socket,
    @User() user: UserEntity,
  ): Promise<void> {
    await this.authService.login(user.id);
    console.log(`${user.username} logged in`);
  }

  @SubscribeMessage('disconnect')
  async handleDisconnect(
    @ConnectedSocket() client: Socket,
    @User() user: UserEntity,
  ): Promise<void> {
    await this.authService.logout(user.id);
    console.log(`${user.username} logged out`);
  }
}
