const { defineConfig } = require("@vue/cli-service");
// unocss
const UnoCSS = require("@unocss/webpack").default;
// unplugin-auto-import
const AutoImport = require("unplugin-auto-import/webpack");
// unplugin-vue-components
const Components = require("unplugin-vue-components/webpack");
// elemnt-plus
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      AutoImport({
        // include: [
        //   /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        //   /\.vue$/,
        //   /\.vue\?vue/, // .vue
        // ],
        imports: ["vue", "vue-router",'@vueuse/core'],

        resolvers: [
          /* ... */
          ElementPlusResolver(),
        ],
        dirs: ['./src/composables'],
        dts: "./auto-imports.d.ts",
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      UnoCSS({}),
    ],
    optimization: {
      realContentHash: true,
    },
  },
  css: {
    extract: true,
  },
});
