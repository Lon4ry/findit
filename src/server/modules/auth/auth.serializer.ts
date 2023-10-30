import { PassportSerializer } from '@nestjs/passport';
import { User } from '../../entities/user.entity';
import { UsersService } from '../users/users.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  serializeUser(user: User, done: (err: Error, payload: string) => void): void {
    done(null, user.id);
  }

  async deserializeUser(id: string, done: (err: Error, user: User) => void) {
    const user = await this.usersService.findById(id);

    done(null, user);
  }
}
