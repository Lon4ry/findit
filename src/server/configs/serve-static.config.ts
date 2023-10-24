import { ConfigModule } from '@nestjs/config';
import {
  ServeStaticModuleAsyncOptions,
  ServeStaticModuleOptions,
} from '@nestjs/serve-static';
import { join } from 'path';

export default class ServeStaticConfig {
  static getServeStaticConfig(): ServeStaticModuleOptions[] {
    return [
      {
        rootPath: join(__dirname, '../..', 'public'),
        serveRoot: '/',
      },
    ];
  }
}

export const ServeStaticConfigAsync: ServeStaticModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (): Promise<ServeStaticModuleOptions[]> =>
    ServeStaticConfig.getServeStaticConfig(),
};
