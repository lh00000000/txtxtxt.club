import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import buble from 'rollup-plugin-buble';
import pkg from './package.json';

export default [
  {
    entry: 'src/index.js',
    dest: pkg.browser,
    format: 'umd',
    moduleName: 'howLongUntilLunch',
    plugins: [
      resolve(),
      commonjs(),
      buble({
        exclude: ['node_modules/**']
      })
    ]
  },
  {
    entry: 'src/index.js',
    external: ['lodash'],
    targets: [
      { dest: pkg.main, format: 'cjs' },
      { dest: pkg.module, format: 'es' }
    ],
    plugins: [
      buble({
        exclude: ['node_modules/**']
      })
    ]
  }
]