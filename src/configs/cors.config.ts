import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import * as process from 'process';

export const CorsConfig: CorsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};
