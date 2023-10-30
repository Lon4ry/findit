import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../../entities/user.entity';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async oauthValidate({ email }): Promise<User | null> {
    const user = await this.usersService.findOne({ where: { email: email } });
    return user
      ? user
      : await this.usersService.create({
          username: 'da' + randomStringGenerator(),
          email: email,
          password: 'da' + randomStringGenerator(),
        });
  }
}
