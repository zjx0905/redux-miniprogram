 
import fs from 'fs';
import path from 'path';
import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import typescript from 'rollup-plugin-typescript2';

function removeDir(name) {
  try {
    if (fs.statSync(name).isFile()) {
      fs.unlinkSync(name);
    } else {
      fs.readdirSync(name).forEach((dir) => removeDir(path.join(name, dir)));
      fs.rmdirSync(name);
    }
  } catch (err) {}
}

export default function() {
  removeDir('package');
  removeDir('types');

  return {
    input: 'src/index.ts',
    output: {
      file: 'package/index.js',
      format: 'cjs',
      indent: false,
    },
    plugins: [
      nodeResolve({
        extensions: ['.ts'],
      }),
      typescript({ useTsconfigDeclarationDir: true }),
      babel({
        extensions: ['.ts'],
      }),
    ],
  };
}
