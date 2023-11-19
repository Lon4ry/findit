import { ConnectedSocket, WebSocketGateway } from '@nestjs/websockets';
import { AppGateway } from '../app.gateway';
import { CorsConfig } from '../../configs/cors.config';
import { Socket } from 'socket.io';
import { UserEntity } from '../../entities/user.entity';

@WebSocketGateway({ namespace: 'users', cors: CorsConfig })
export class UsersGateway extends AppGateway {
  constructor() {
    super();
  }

  handleConnection(
    @ConnectedSocket() client: Socket & { request: { user: UserEntity } },
  ): void {
    const user = client.request.user;
    console.log(`${user.username} (${client.id}) connected to user gateway`);
  }

  handleDisconnect(
    @ConnectedSocket() client: Socket & { request: { user: UserEntity } },
  ): void {
    const user = client.request.user;
    console.log(
      `${user.username} (${client.id}) disconnected from user gateway`,
    );
  }
}
