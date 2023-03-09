const webpackScssWithCSSModules = require("./plugins/webpackScssWithCSSModules");

/** @type {import('@storybook/react/types').StorybookConfig} */
const config = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5",
  },
  /**
   * @see https://lahuman.github.io/storybook_css_module/ Storybook cssModules 설정
   */
  webpackFinal: async (config, { configType }) => {
    // SCSS + CSS Modules
    config = webpackScssWithCSSModules(config);

    return config;
  },
};

module.exports = config;
