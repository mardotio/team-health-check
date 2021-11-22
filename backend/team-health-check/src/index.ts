import express from 'express';
import * as dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { createConnection } from 'typeorm';
import dbConfig from './database';

dotenv.config();

const PORT = parseInt(process.env.SERVER_PORT || '', 10);

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());

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
