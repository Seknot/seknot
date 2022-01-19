const webpack = require('webpack');
const slsw = require('serverless-webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const Dotenv = require('dotenv-webpack');

const environment = process.env.NODE_ENV || 'dev';

module.exports = {
  mode: 'production',
  // serverless.yml で handler に指定したファイルが自動的にエントリーポイントに出来るっぽい
  entry: slsw.lib.entries,
  target: 'node',
  externals: [nodeExternals()],
  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, `./.env/.env.${environment}`),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig.json',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    alias: {
      '@': path.join(__dirname, '/src/'),
    },
  },
};
