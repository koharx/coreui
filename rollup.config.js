import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import terser from '@rollup/plugin-terser';
import json from '@rollup/plugin-json';
import { readFileSync } from 'fs';

const packageJson = JSON.parse(readFileSync('./package.json', 'utf8'));

export default {
  input: 'src/index.ts',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve({
      browser: true,
      preferBuiltins: true,
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
      mainFields: ['browser', 'module', 'main'],
    }),
    commonjs({
      include: /node_modules/,
      transformMixedEsModules: true,
      requireReturnsDefault: 'auto',
    }),
    json(),
    typescript({ 
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: 'dist',
    }),
    postcss({
      extensions: ['.css'],
      minimize: true,
    }),
    terser(),
  ],
  external: [
    'react',
    'react-dom',
    'react-router-dom',
    '@mui/material',
    '@mui/icons-material',
    '@emotion/react',
    '@emotion/styled',
    'i18next',
    'react-i18next',
    'i18next-browser-languagedetector',
    'winston',
    'zustand',
    'axios',
    'jwt-decode',
    'path',
    'os',
    'crypto',
    'stream',
    'buffer',
    'util',
    'assert',
    'fs',
    'http',
    'https',
    'zlib',
    'url',
    'process',
    'constants',
    'events',
    'string_decoder',
    'querystring',
    'punycode',
    'domain',
    'timers',
    'console',
    'vm',
    'tty',
    'net',
    'dns',
    'dgram',
    'child_process'
  ],
}; 