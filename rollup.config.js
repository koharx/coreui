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
    resolve(),
    commonjs(),
    json(),
    typescript({ tsconfig: './tsconfig.json' }),
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
    'jwt-decode'
  ],
}; 