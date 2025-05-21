const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    fallback: {
      "os": require.resolve("os-browserify/browser"),
      "path": require.resolve("path-browserify"),
      "zlib": require.resolve("browserify-zlib"),
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "fs": false,
      "crypto": false,
      "stream": false,
      "buffer": false,
      "util": false,
      "assert": false,
      "url": false,
      "process": false,
      "constants": false,
      "events": false,
      "string_decoder": false,
      "querystring": false,
      "punycode": false,
      "domain": false,
      "timers": false,
      "console": false,
      "vm": false,
      "tty": false,
      "net": false,
      "dns": false,
      "dgram": false,
      "child_process": false
    },
    alias: {
      '@mui/material': path.resolve(__dirname, 'node_modules/@mui/material'),
      '@mui/icons-material': path.resolve(__dirname, 'node_modules/@mui/icons-material'),
      '@emotion/react': path.resolve(__dirname, 'node_modules/@emotion/react'),
      '@emotion/styled': path.resolve(__dirname, 'node_modules/@emotion/styled')
    }
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
}; 