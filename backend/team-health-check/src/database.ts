import { ConnectionOptions } from 'typeorm';
import APP_ENVIRONMENT from './util/environment';
import Survey from './entities/Survey';
import SurveyQuestion from './entities/SurveyQuestion';

const dbConfig = (): ConnectionOptions => ({
  type: 'postgres',
  host: APP_ENVIRONMENT.POSTGRES_HOST,
  port: Number(APP_ENVIRONMENT.POSTGRES_PORT),
  username: APP_ENVIRONMENT.POSTGRES_USER,
  password: APP_ENVIRONMENT.POSTGRES_PASSWORD,
  database: APP_ENVIRONMENT.POSTGRES_DB,
  entities: [Survey, SurveyQuestion],
  synchronize: true,
});

export default dbConfig;
