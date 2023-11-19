import { ConnectedSocket, WebSocketGateway } from '@nestjs/websockets';
import { CorsConfig } from '../../configs/cors.config';
import { AppGateway } from '../app.gateway';
import { Socket } from 'socket.io';
import { AuthService } from './auth.service';
import { UserEntity } from '../../entities/user.entity';

@WebSocketGateway({ namespace: 'auth', cors: CorsConfig })
export class AuthGateway extends AppGateway {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async handleConnection(
    @ConnectedSocket() client: Socket & { request: { user: UserEntity } },
  ): Promise<void> {
    const user = client.request.user;
    await this.authService.login(user.id);
    console.log(`${user.username} (${client.id}) logged in`);
  }

  async handleDisconnect(
    @ConnectedSocket() client: Socket & { request: { user: UserEntity } },
  ): Promise<void> {
    const user = client.request.user;
    await this.authService.logout(user.id);
    console.log(`${user.username} (${client.id}) logged out`);
  }
}
