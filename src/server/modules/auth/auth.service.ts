import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async oauthValidate(profile: Record<string, any>): Promise<User | null> {
    let user = null;
    let formattedProfile = null;

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

        formattedProfile = {
          name: {
            firstName: profile.name.givenName,
            lastname: profile.name.familyName,
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

        formattedProfile = {
          name: {
            firstName: profile.name.familyName,
            lastname: profile.name.givenName,
          },
          gender: profile.gender,
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

          formattedProfile = {
            username: profile.login,
          };
        }
        break;
    }

    console.log(profile.provider);
    console.log(formattedProfile);

    return user;
  }
}
