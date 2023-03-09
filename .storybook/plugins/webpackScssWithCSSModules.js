const path = require("path");

/**
 * @typedef {Parameters<import('@storybook/react/types').StorybookConfig['webpackFinal']>[0]} WebpackConfig
 */

/**
 * @typedef {Parameters<import('@storybook/react/types').StorybookConfig['webpackFinal']>[1]['configType']} WebpackConfigType
 */

/**
 * @param {WebpackConfig} config
 *
 * @see https://github.com/storybookjs/storybook/issues/17768
 */
const webpackScssWithCSSModules = (config) => {
  config.module.rules.push({
    test: /\.s(a|c)ss$/,
    include: path.resolve(__dirname, "../", "../"), // __dirname은 실행 중인 파일의 경로이므로 .storybook/plugins입니다.
    use: [
      "style-loader",
      {
        loader: "css-loader",
        options: {
          // https://github.com/webpack-contrib/css-loader#modules
          modules: {
            auto: true,
            localIdentName: "[name]__[local]--[hash:base64:5]",
            exportLocalsConvention: "camelCaseOnly", // kebab case -> camel case
          },
        },
      },
      "sass-loader",
    ],
  });

  return config;
};

module.exports = webpackScssWithCSSModules;
