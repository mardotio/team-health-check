// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const tsConfig = path.join(__dirname, 'tsconfig.json');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  entry: [
    !isProd && 'webpack/hot/poll?100',
    path.join(__dirname, 'src', 'index.ts'),
  ].filter(Boolean),
  watch: !isProd,
  target: 'node',
  externals: [
    nodeExternals({
      allowlist: isProd ? undefined : ['webpack/hot/poll?100'],
    }),
  ],
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: tsConfig,
            },
          },
        ],
      },
    ],
  },
  mode: 'development',
  resolve: {
    extensions: ['.ts', '.js'],
    plugins: [new TsConfigPathsPlugin({ configFile: tsConfig })],
  },
  plugins: [!isProd && new webpack.HotModuleReplacementPlugin()].filter(
    Boolean,
  ),
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'server.js',
  },
};
