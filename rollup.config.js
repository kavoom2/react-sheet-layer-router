/**
 * Getting started with Rollup
 *
 * @see https://rollupjs.org/introduction/#quick-start - Quick start의 rollup-starter-lib 참조
 * @see https://javascript.plainenglish.io/tutorial-create-your-own-component-library-with-react-and-rollup-b8978d885297
 * @see https://dev.to/nasheomirro/comment/239nj Handling major issues
 */

import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import { readFileSync } from "fs";
import bundleSize from "rollup-plugin-bundle-size";
import dts from "rollup-plugin-dts";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";

const packageJSON = JSON.parse(
  readFileSync("package.json", { encoding: "utf8" })
);

/**
 * @type {import('rollup').RollupOptions[]}
 */
const config = [
  // Bundle: CommonJS, ESM
  {
    input: "./src/index.ts",
    external: ["react", "react-dom", "framer-motion"],
    output: [
      {
        file: `dist/index.cjs.js`,
        format: "cjs",
      },
      {
        file: `dist/index.js`,
        format: "esm",
      },
    ],
    plugins: [
      postcss(
        /**
         * @see https://github.com/egoist/rollup-plugin-postcss#css-modules
         * @see https://github.com/madyankin/postcss-modules#localsconvention
         */
        {
          autoModules: false,
          extract: false,
          modules: {
            generateScopedName: "[name]__[local]--[hash:base64:5]",
            localsConvention: "camelCaseOnly",
          },
          use: ["sass"],
        }
      ),
      babel({
        babelHelpers: "bundled",
        exclude: "node_modules/**",
        presets: ["@babel/preset-react"],
      }),
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json", sourceMap: true }),
      terser(),
      ...(process.env.bundleAnalyzer === "TRUE" ? [bundleSize()] : []),
    ],
  },
  /**
   * Bundle: Types
   * @see https://stackoverflow.com/a/75021330/14980971 dts plugin issue
   */
  {
    input: "./dist/types/index.d.ts",
    output: [{ file: `dist/index.d.ts`, format: "esm" }],
    plugins: [dts.default()],
  },
];

export default config;
