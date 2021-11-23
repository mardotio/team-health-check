import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { createConnection } from 'typeorm';
import dbConfig from './database';
import APP_ENVIRONMENT from './util/environment';
import loginRouter from './routers/login.router';
import surveysRouter from './routers/surveys.router';
import withJwtAuth from './middleware/auth.middleware';
import teamsRouter from './routers/teams.router';

const PORT = parseInt(APP_ENVIRONMENT.SERVER_PORT, 10);

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/login', loginRouter);
app.use('/surveys', withJwtAuth, surveysRouter);
app.use('/teams', withJwtAuth, teamsRouter);

/**
 * Webpack HMR Activation
 */

type ModuleId = string | number;

interface WebpackHotModule {
  hot?: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
    accept(
      dependencies: string[],
      callback?: (updatedDependencies: ModuleId[]) => void,
    ): void;
    accept(dependency: string, callback?: () => void): void;
    accept(errHandler?: (err: Error) => void): void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dispose(callback: (data: any) => void): void;
  };
}

declare const module: WebpackHotModule;

/**
 * Server Activation
 */
createConnection(dbConfig())
  .then(() => {
    const server = app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Listening on port ${PORT}`);
    });
    const activateHmr = () => {
      if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => server.close());
      }
    };
    activateHmr();
  })
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error('Unable to connect to DB', e);
    process.exit(1);
  });
