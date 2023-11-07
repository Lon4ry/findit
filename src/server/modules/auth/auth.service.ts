import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../../entities/user.entity';
import { LoginDto } from '../../DTOs/auth/login.dto';
import { RegistrationDto } from '../../DTOs/auth/registration.dto';
import { ProfilesService } from '../profiles/profiles.service';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly profilesService: ProfilesService,
  ) {}

  async validate({ uniq, password }: LoginDto): Promise<User | null> {
    let user = await this.usersService.findOneWithPassword({
      where: { username: uniq },
    });
    user = user
      ? user
      : await this.usersService.findOneWithPassword({
          where: { email: uniq },
        });

    if (user && (await compare(password, user.password))) {
      delete user.password;
      return user;
    }
    return null;
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
          where: { linkedAccounts: { google: profile.id } },
        });
        if (!user) {
          user = await this.usersService.findOne({
            where: { email: profile.emails[0].value },
          });
          if (user) {
            user.linkedAccounts.google = profile.id;
            user = user.save();
          }
        }

        formatted = {
          user: {
            email: profile.emails[0].value,
            linkedAccounts: { google: profile.id },
          },
          profile: {
            name: {
              firstName: profile.name.givenName,
              lastname: profile.name.familyName,
            },
          },
        };
        break;

      case 'yandex':
        user = await this.usersService.findOne({
          where: { linkedAccounts: { yandex: profile.id } },
        });
        if (!user) {
          user = await this.usersService.findOne({
            where: { email: profile.emails[0].value },
          });
          if (user) {
            user.linkedAccounts.yandex = profile.id;
            user = user.save();
          }
        }

        formatted = {
          user: {
            email: profile.emails[0].value,
            linkedAccounts: { yandex: profile.id },
          },
          profile: {
            name: {
              firstName: profile.name.familyName,
              lastname: profile.name.givenName,
            },
            gender: profile.gender,
          },
        };
        break;

      case 'github':
        if (profile.type === 'User') {
          user = await this.usersService.findOne({
            where: { linkedAccounts: { github: profile.id } },
          });
          if (!user) {
            user = await this.usersService.findOne({
              where: { email: profile.email },
            });
            if (user) {
              user.linkedAccounts.github = profile.id;
              user = user.save();
            }
          }

          formatted = {
            user: {
              username: profile.login,
              email: profile.email,
              linkedAccounts: { github: profile.id },
            },
          };
        }
        break;
    }

    if (user) delete user.password;

    return user
      ? { type: 'User', payload: user }
      : { type: 'DefaultRegistrationValues', payload: formatted };
  }

  async register(
    registrationDto: RegistrationDto,
    session: Record<string, any>,
  ): Promise<void> {
    const user = await this.usersService.create(registrationDto.user);
    await this.profilesService.create({
      ...registrationDto.profile,
      user: user,
    });
    if (user) delete user.password;

    session['passport'] = { user: { id: user.id, role: user.role } };
  }
}
