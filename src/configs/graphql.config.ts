import {
  ApolloDriver,
  ApolloDriverAsyncConfig,
  ApolloDriverConfig,
} from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';

export default class GraphQLConfig {
  static getGraphQLConfig(
    configService: ConfigService,
  ): Omit<ApolloDriverConfig, 'driver'> {
    return {
      // include: [
      //   UsersModule,
      //   ProjectsModule,
      //   ProjectsToUsersModule,
      //   NoticesModule,
      // ],
      playground: Boolean(configService.get('GRAPHQL_PLAYGROUND')) || true,
      // autoSchemaFile: join(process.cwd(), 'schema.gql'),
      // autoSchemaFile: join(__dirname, 'src/schema.gql'),
      autoSchemaFile: true,
    };
  }
}

export const GraphQLConfigAsync: ApolloDriverAsyncConfig = {
  driver: ApolloDriver,
  imports: [ConfigModule],
  useFactory: async (
    configService: ConfigService,
  ): Promise<Omit<ApolloDriverConfig, 'driver'>> =>
    GraphQLConfig.getGraphQLConfig(configService),
  inject: [ConfigService],
};
