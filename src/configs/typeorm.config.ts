import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

export default class TypeOrmConfig {
  static getTypeOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
    return {
      type: 'postgres',

      host: configService.get('DB_HOST'),
      port: configService.get('DB_PORT'),

      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWD'),
      database: configService.get('DB_NAME'),

      synchronize: true,
      autoLoadEntities: true,
      entities: ['entities/*.ts'],

      retryAttempts: 5,
      retryDelay: 3000,

      logger: 'file',
      cache: { duration: 3000 },
    };
  }
}

export const TypeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> =>
    TypeOrmConfig.getTypeOrmConfig(configService),
  inject: [ConfigService],
};
