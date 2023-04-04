'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var resolve = require('@rollup/plugin-node-resolve');
var commonjs = require('@rollup/plugin-commonjs');
var typescript = require('@rollup/plugin-typescript');
var dts = require('rollup-plugin-dts');
var postcss = require('rollup-plugin-postcss');
var rollupPluginTerser = require('rollup-plugin-terser');
var peerDepsExternal = require('rollup-plugin-peer-deps-external');
var image = require('@rollup/plugin-image');

const packageJson = require("./package.json");

var rollup_config = [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json", exclude:["**/__stories__", "**/*.stories.tsx"] }),
      postcss(),
      
      rollupPluginTerser.terser(),
      image(),
    ],
  },
  {
    input: "dist/esm/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts.default()],

    external: [/\.css$/], // telling rollup anything that is .css aren't part of type exports 
  },
];

exports.default = rollup_config;
