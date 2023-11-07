import { PassportSerializer } from '@nestjs/passport';
import { User } from '../../entities/user.entity';
import { UsersService } from '../users/users.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  serializeUser(
    user: User,
    done: (err: Error, payload: { id: string; role: string }) => void,
  ): void {
    done(null, { id: user.id, role: user.role });
  }

  async deserializeUser(
    payload: { id: string; role: string },
    done: (err: Error, user: User) => void,
  ) {
    const user = await this.usersService.findById(payload.id);
    done(null, user);
  }
}
