import { PassportSerializer } from '@nestjs/passport';
import { UserEntity } from '../../entities/user.entity';
import { UsersService } from '../users/users.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  serializeUser(
    user: UserEntity,
    done: (
      err: Error,
      payload: {
        id: string;
        role: string;
        subscription: { type: string; expiresIn: Date };
      },
    ) => void,
  ): void {
    done(null, {
      id: user.id,
      role: user.role,
      subscription: user.subscription,
    });
  }

  async deserializeUser(
    payload: {
      id: string;
      role: string;
      subscription: { type: string; expiresIn: Date };
    },
    done: (err: Error, user: UserEntity) => void,
  ) {
    const user = await this.usersService.findOne({
      where: { id: payload.id },
      select: ['id', 'username', 'role', 'subscription'],
    });
    done(null, user);
  }
}
