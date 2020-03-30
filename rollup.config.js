/*
 * @Author: early-autumn
 * @Date: 2020-03-06 20:40:30
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-03-30 13:33:54
 */
import fs from 'fs';
import path from 'path';
import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import typescript from 'rollup-plugin-typescript2';

import pkg from './package.json';

const extensions = ['.ts'];
const noDeclarationFiles = { compilerOptions: { declaration: false } };

const babelRuntimeVersion = pkg.dependencies['@babel/runtime'].replace(/^[^0-9]*/, '');

const makeExternalPredicate = (externalArr) => {
  if (externalArr.length === 0) {
    return () => false;
  }
  const pattern = new RegExp(`^(${externalArr.join('|')})($|/)`);
  return (id) => pattern.test(id);
};

function removeDir(name) {
  try {
    if (fs.statSync(name).isFile()) {
      fs.unlinkSync(name);
    } else {
      fs.readdirSync(name).forEach((dir) => removeDir(path.join(name, dir)));
      fs.rmdirSync(name);
    }
  } catch (err) {
    console.log(err);
  }
}

export default function() {
  removeDir('package');
  removeDir('types');

  return [
    // CommonJS
    {
      input: 'src/index.ts',
      output: { file: 'package/lib/redux-miniprogram.js', format: 'cjs', indent: false },
      external: makeExternalPredicate([
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.peerDependencies || {}),
      ]),
      plugins: [
        nodeResolve({
          extensions,
        }),
        typescript({ useTsconfigDeclarationDir: true }),
        babel({
          extensions,
          plugins: [['@babel/plugin-transform-runtime', { version: babelRuntimeVersion }]],
          runtimeHelpers: true,
        }),
      ],
    },

    // miniprogram
    {
      input: 'src/index.ts',
      output: {
        file: 'package/miniprogram/index.js',
        format: 'cjs',
        indent: false,
      },
      plugins: [
        nodeResolve({
          extensions,
        }),
        typescript({ useTsconfigDeclarationDir: true }),
        babel({
          extensions,
        }),
      ],
    },

    // ES
    {
      input: 'src/index.ts',
      output: { file: 'package/es/redux-miniprogram.js', format: 'es', indent: false },
      external: makeExternalPredicate([
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.peerDependencies || {}),
      ]),
      plugins: [
        nodeResolve({
          extensions,
        }),
        typescript({ tsconfigOverride: noDeclarationFiles }),
        babel({
          extensions,
          plugins: [
            [
              '@babel/plugin-transform-runtime',
              { version: babelRuntimeVersion, useESModules: true },
            ],
          ],
          runtimeHelpers: true,
        }),
      ],
    },
  ];
}
