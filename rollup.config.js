/*
 * @Author: early-autumn
 * @Date: 2020-03-06 20:40:30
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-03-25 13:33:40
 */

import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import typescript from 'rollup-plugin-typescript2';

const extensions = ['.ts'];

export default [
  // CommonJS
  {
    input: 'src/index.ts',
    output: { file: 'lib/redux-miniprogram.js', format: 'cjs', indent: false },
    external: ['@babel/runtime'],
    plugins: [
      nodeResolve({
        extensions,
      }),
      typescript({ useTsconfigDeclarationDir: true }),
      babel({
        extensions,
        plugins: [['@babel/plugin-transform-runtime']],
        runtimeHelpers: true,
      }),
    ],
  },

  // ES
  {
    input: 'src/index.ts',
    output: { file: 'lib/redux-miniprogram.es.js', format: 'es', indent: false },
    external: ['@babel/runtime'],
    plugins: [
      nodeResolve({
        extensions,
      }),
      typescript({ tsconfigOverride: { compilerOptions: { declaration: false } } }),
      babel({
        extensions,
        plugins: [['@babel/plugin-transform-runtime', { useESModules: true }]],
        runtimeHelpers: true,
      }),
    ],
  },
];
