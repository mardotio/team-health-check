import { ConnectionOptions } from 'typeorm';
import APP_ENVIRONMENT from './util/environment';

const dbConfig = (): ConnectionOptions => ({
  type: 'postgres',
  host: APP_ENVIRONMENT.POSTGRES_HOST,
  port: Number(APP_ENVIRONMENT.POSTGRES_PORT),
  username: APP_ENVIRONMENT.POSTGRES_USER,
  password: APP_ENVIRONMENT.POSTGRES_PASSWORD,
  database: APP_ENVIRONMENT.POSTGRES_DB,
  entities: [],
  synchronize: true,
});

export default dbConfig;
