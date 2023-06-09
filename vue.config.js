const { defineConfig } = require("@vue/cli-service");
// unocss
const UnoCSS = require("@unocss/webpack").default;
// unplugin-auto-import
const AutoImport = require("unplugin-auto-import/webpack");
// unplugin-vue-components
const Components = require("unplugin-vue-components/webpack");
// elemnt-plus
const { VantResolver } = require("unplugin-vue-components/resolvers");
module.exports = defineConfig({
  publicPath: "./",
  transpileDependencies: true,
  devServer: {
    client: {
      overlay: false,
    },
  },
  configureWebpack: {
    plugins: [
      AutoImport({
        imports: ["vue", "vue-router", "@vueuse/core", "pinia"],
        resolvers: [],
        dirs: ["./src/composables"],
        dts: "./auto-imports.d.ts",
      }),
      Components({
        resolvers: [VantResolver()],
      }),
      UnoCSS({}),
    ],
    optimization: {
      realContentHash: true,
    },
  },
  css: {
    loaderOptions: {
      postcss: {
        postcssOptions: (loaderContext) => {
          return {
            plugins: [
              ["autoprefixer"],
              // vant px转vw。参坑：单独写在postcss.config.js中无法解析vant内部样式
              {
                "postcss-px-to-viewport": {
                  unitToConvert: "px",
                  // 区分vant设计以375为基准。实际项目ui为750的情况
                  viewportWidth: loaderContext.resourcePath.includes("vant")
                    ? 375
                    : 1080,
                  unitPrecision: 5,
                  propList: ["*"],
                  viewportUnit: "vw",
                  fontViewportUnit: "vw",
                  selectorBlackList: [],
                  minPixelValue: 1,
                  mediaQuery: false,
                  replace: true,
                  exclude: [],
                  landscape: false,
                  landscapeUnit: "vw",
                  landscapeWidth: 568,
                },
              },
            ],
          };
        },
      },
    },
  },
});
