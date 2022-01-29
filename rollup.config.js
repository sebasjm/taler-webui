import linaria from '@linaria/rollup';
import css from 'rollup-plugin-css-only';
import typescript from '@rollup/plugin-typescript';
import nodeResolve from "@rollup/plugin-node-resolve";
import alias from '@rollup/plugin-alias';
import svgr from '@svgr/rollup'
import copy from 'rollup-plugin-copy'


export default {
  input: 'src/index.tsx',
  output: {
    file: 'dist/index.js',
    format: 'iife',
    name: 'app'
  },
  plugins: [
    linaria({
      sourceMap: process.env.NODE_ENV !== 'production',
    }),
    css({
      output: 'styles.css',
    }),
    alias({
      entries: [
        { find: 'react', replacement: 'preact/compat' },
        { find: 'react-dom', replacement: 'preact/compat' }
      ]
    }),
    nodeResolve({
      browser: true,
      preferBuiltins: true,
    }),
    svgr(),
    typescript(),
    copy({
      targets: [
        { src: 'static/**/*', dest: 'dist/' },
      ]
    })
  ],
};

