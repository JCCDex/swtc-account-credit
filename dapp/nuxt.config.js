const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const WebpackAutoInject = require("webpack-auto-inject-version");

export default {
  mode: "spa",
  /*
   ** Headers of the page
   */
  head: {
    title: "SWTC钱包风险查询",
    meta: [
      { charset: "utf-8" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    script: [
      {
        src: process.env.NODE_ENV === "development" ? "https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js" : "https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.min.js"
      },
      {
        src: "https://cdn.jsdelivr.net/npm/jcc-moac-utils@0.2.3/dist/jcc-moac-utils.min.js"
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  env: {
    CONTRACT: process.env.Contract,
    NODE: process.env.Node,
    MAINNET: process.env.Mainnet
  },
  router: {
    mode: "hash"
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [
    "~/style/media.scss",
    "~/style/button.scss",
    "~/style/default.scss",
    "~/style/base.scss",
    "flex.css/dist/flex.css",
    "~/style/layout.scss",
    "~/style/arrow.scss",
    "~/style/icon.scss",
    "~/style/scroll.scss",
    "~/style/override-vant.scss",
    "~/style/animation.scss"
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ["~/plugins/dpr", "~/plugins/vant", "~/plugins/i18n", "~/plugins/tp"],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ["@nuxt/typescript-build"],
  /*
   ** Nuxt.js modules
   */
  modules: [],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    publicPath: "/nuxt/",
    extend(config, ctx) {
      config.externals = {
        vue: "Vue",
        "jcc-moac-utils": "jcc_moac_utils"
      };
      if (!ctx.isDev) {
        config.plugins.push(
          new UglifyJsPlugin({
            uglifyOptions: {
              compress: {
                drop_console: true
              }
            },
            sourceMap: false,
            cache: true,
            parallel: true
          })
        );
        config.plugins.push(
          new WebpackAutoInject({
            SHORT: "Account credit for SWTC",
            SILENT: true,
            PACKAGE_JSON_PATH: "./package.json",
            components: {
              AutoIncreaseVersion: true,
              InjectAsComment: true,
              InjectByTag: true
            },
            componentsOptions: {
              AutoIncreaseVersion: {
                runInWatchMode: false
              },
              InjectAsComment: {
                tag: "Release version: {version} - {date}",
                dateFormat: "yyyy-mm-dd HH:MM:ss"
              }
            }
          })
        );
      }
      return config;
    }
  }
};
