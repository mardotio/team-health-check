import * as dotenv from 'dotenv';
import arrayOfAll from './arrayOfAll';

dotenv.config();

type EnvironmentVariables =
  | 'POSTGRES_DB'
  | 'POSTGRES_USER'
  | 'POSTGRES_PASSWORD'
  | 'POSTGRES_PORT'
  | 'POSTGRES_HOST'
  | 'SERVER_PORT'
  | 'JWT_SECRET'
  | 'QUESTIONS_URL';

type RequiredEnvironment = Record<EnvironmentVariables, string>;

const ENVIRONMENT_VARIABLES = arrayOfAll<EnvironmentVariables>()([
  'POSTGRES_DB',
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'POSTGRES_PORT',
  'POSTGRES_HOST',
  'SERVER_PORT',
  'JWT_SECRET',
  'QUESTIONS_URL',
]);

type OptionalEnvironmentVariables = 'ENVIRONMENT_MODE';

type OptionalEnvironment = Record<
  OptionalEnvironmentVariables,
  string | undefined
>;

const OPTIONAL_ENVIRONMENT_VARIABLES =
  arrayOfAll<OptionalEnvironmentVariables>()(['ENVIRONMENT_MODE']);

type DevEnvironmentVariables = 'NEW_USER_ID_PER_JWT';

type DevEnvironment = Record<DevEnvironmentVariables, string | undefined>;

const DEV_ENVIRONMENT_VARIABLES = arrayOfAll<DevEnvironmentVariables>()([
  'NEW_USER_ID_PER_JWT',
]);

type GeneratedEnvironment = RequiredEnvironment &
  OptionalEnvironment &
  DevEnvironment;

export const generateEnvironment = (
  requiredEnv: EnvironmentVariables[],
  optionalEnv: OptionalEnvironmentVariables[],
  devEnv: DevEnvironmentVariables[],
): GeneratedEnvironment => {
  const req = requiredEnv.reduce((env, envVar) => {
    const value = process.env[envVar];
    if (!value) {
      // eslint-disable-next-line no-console
      console.error(
        `Environment config not properly set. Expecting ${envVar}.`,
      );
      process.exit(1);
    }
    return {
      ...env,
      [envVar]: value,
    };
  }, {} as RequiredEnvironment);

  const opt = optionalEnv.reduce((env, envVar) => {
    const value = process.env[envVar];
    if (!value) {
      return env;
    }
    return {
      ...env,
      [envVar]: value,
    };
  }, {} as OptionalEnvironment);

  const isProd =
    !opt.ENVIRONMENT_MODE ||
    opt.ENVIRONMENT_MODE.toLowerCase() === 'production';

  const dev = isProd
    ? ({} as DevEnvironment)
    : devEnv.reduce((env, envVar) => {
        const value = process.env[envVar];
        if (!value) {
          return env;
        }
        return {
          ...env,
          [envVar]: value,
        };
      }, {} as DevEnvironment);

  return { ...req, ...opt, ...dev };
};

const APP_ENVIRONMENT = generateEnvironment(
  ENVIRONMENT_VARIABLES,
  OPTIONAL_ENVIRONMENT_VARIABLES,
  DEV_ENVIRONMENT_VARIABLES,
);

export const isProduction =
  !APP_ENVIRONMENT.ENVIRONMENT_MODE ||
  APP_ENVIRONMENT.ENVIRONMENT_MODE.toLowerCase() === 'production';

export default APP_ENVIRONMENT;
