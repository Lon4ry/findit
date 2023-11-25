import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../../entities/user.entity';
import { AuthDto } from '../../DTOs/auth.dto';
import { compare } from 'bcrypt';
import { CreateUserDto } from '../../DTOs/user/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validate({ uniq, password }: AuthDto): Promise<UserEntity | null> {
    const user = await this.usersService.findOne({
      where: [{ username: uniq }, { email: uniq }],
      select: [
        'id',
        'role',
        'subscription',
        'username',
        'password',
        'authLogs',
      ],
    });

    if (user) {
      if (!(await compare(password, user.password)))
        user.authLogs.history.push({
          ip: '',
          strategy: 'local',
          success: false,
          date: new Date(),
        });
      else
        user.authLogs.history.push({
          ip: '',
          strategy: 'local',
          success: true,
          date: new Date(),
        });

      await user.save();

      return user.authLogs.history[user.authLogs.history.length - 1].success
        ? user
        : null;
    } else return null;
  }

  async oauthValidate(
    profile: Record<string, any>,
  ): Promise<{ type: string; payload: unknown }> {
    let user = null;
    let formatted = null;

    switch (profile.provider) {
      case 'apple': // TODO: Apple validating
        console.log(profile);
        break;

      case 'google':
        user = await this.usersService.findOne({
          where: [
            { linkedOAuth: { google: profile.id } },
            { email: profile.emails[0].value },
          ],
          select: [
            'id',
            'role',
            'subscription',
            'username',
            'linkedOAuth',
            'authLogs',
          ],
        });

        if (!user.linkedOAuth.google) user.linkedOAuth.google = profile.id;

        formatted = {
          email: profile.emails[0].value,
          linkedOAuth: { google: profile.id },
          name: {
            firstName: profile.name.givenName,
            lastname: profile.name.familyName,
          },
        };
        break;

      case 'yandex':
        user = await this.usersService.findOne({
          where: [
            { linkedOAuth: { yandex: profile.id } },
            { email: profile.emails[0].value },
          ],
          select: [
            'id',
            'role',
            'subscription',
            'username',
            'linkedOAuth',
            'authLogs',
          ],
        });

        if (!user.linkedOAuth.yandex) user.linkedOAuth.yandex = profile.id;

        formatted = {
          email: profile.emails[0].value,
          linkedOAuth: { yandex: profile.id },
          name: {
            firstName: profile.name.familyName,
            lastname: profile.name.givenName,
          },
          gender: profile.gender,
        };
        break;

      case 'github':
        // TODO: Parse profile
        console.log(profile);

        formatted = {
          username: profile.login,
          email: profile.email,
          linkedOAuth: { github: profile.id },
        };
        break;
    }

    if (user) {
      user.authLogs.history.push({
        ip: '',
        strategy: profile.provider,
        success: true,
        date: new Date(),
      });
      user.save();
      delete user.password;
    }

    return user
      ? { type: 'User', payload: user }
      : { type: 'DefaultRegistrationValues', payload: formatted };
  }

  async register(
    createUserDto: CreateUserDto,
    session: Record<string, any>,
  ): Promise<void> {
    const user: UserEntity = await this.usersService.create(createUserDto);
    if (user) delete user.password;

    session['passport'] = {
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        subscription: user.subscription,
      },
    };
  }

  async login(id: string): Promise<void> {
    const user: UserEntity = await this.usersService.findOne({
      where: { id: id },
      select: ['id', 'authLogs'],
    });

    user.authLogs = {
      ...user.authLogs,
      isLoggedIn: true,
    };

    await user.save();
  }

  async logout(id: string): Promise<void> {
    const user: UserEntity = await this.usersService.findOne({
      where: { id: id },
      select: ['id', 'authLogs'],
    });

    user.authLogs = {
      ...user.authLogs,
      isLoggedIn: false,
      lastLogin: new Date(),
    };

    await user.save();
  }
}
