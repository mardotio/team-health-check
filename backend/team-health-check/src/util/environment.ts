import * as dotenv from 'dotenv';
import arrayOfAll from './arrayOfAll';

dotenv.config();

type OptionalEnvironment<K extends string> = Record<K, string | undefined>;
type RequiredEnvironment<K extends string> = Record<K, string>;

type GeneratedEnvironment<
  RequiredEnv extends string,
  OptionalEnv extends string,
> = RequiredEnvironment<RequiredEnv> & OptionalEnvironment<OptionalEnv>;

type EnvironmentVariables =
  | 'POSTGRES_DB'
  | 'POSTGRES_USER'
  | 'POSTGRES_PASSWORD'
  | 'POSTGRES_PORT'
  | 'POSTGRES_HOST'
  | 'SERVER_PORT'
  | 'JWT_SECRET';

type OptionalEnvironmentVariables = 'ENVIRONMENT_MODE';

const ENVIRONMENT_VARIABLES = arrayOfAll<EnvironmentVariables>()([
  'POSTGRES_DB',
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'POSTGRES_PORT',
  'POSTGRES_HOST',
  'SERVER_PORT',
  'JWT_SECRET',
]);

const OPTIONAL_ENVIRONMENT_VARIABLES = arrayOfAll<OptionalEnvironmentVariables>()([
  'ENVIRONMENT_MODE',
]);

export const generateEnvironment = <
  RequiredEnv extends string,
  OptionalEnv extends string,
>(
  requiredEnv: RequiredEnv[],
  optionalEnv: OptionalEnv[],
): GeneratedEnvironment<RequiredEnv, OptionalEnv> => {
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
  }, {} as RequiredEnvironment<RequiredEnv>);

  const opt = optionalEnv.reduce((env, envVar) => {
    const value = process.env[envVar];
    if (!value) {
      return env;
    }
    return {
      ...env,
      [envVar]: value,
    };
  }, {} as OptionalEnvironment<OptionalEnv>);

  return { ...req, ...opt };
};

const APP_ENVIRONMENT = generateEnvironment(
  ENVIRONMENT_VARIABLES,
  OPTIONAL_ENVIRONMENT_VARIABLES,
);

export const isProduction =
  !APP_ENVIRONMENT.ENVIRONMENT_MODE ||
  APP_ENVIRONMENT.ENVIRONMENT_MODE.toLowerCase() === 'production';

export default APP_ENVIRONMENT;
