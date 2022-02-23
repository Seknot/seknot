export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  ssr: false,
  target: "static",
  head: {
    title: "console",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        hid: "description",
        name: "description",
        content: "",
      },
      {
        name: "format-detection",
        content: "telephone=no",
      },
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico",
      },
    ],
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  // css: ["ant-design-vue/dist/antd.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  // plugins: ["@/plugins/antd-ui"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "bootstrap-vue/nuxt",
    "@nuxtjs/auth-next",
  ],

  bootstrapVue: {},

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: "/",
    proxy: true,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  auth: {
    strategies: {
      auth0: {
        domain: "dev-xe71ik8z.us.auth0.com",
        clientId: "vYOXlcdtCOym5SbyzSlyVhqyqCUMYepB",
        audience: "https://api.seknot.net",
        scope: [
          "openid",
          "profile",
          "email",
          "read:service",
          "create:service",
          "read:api-key",
        ],
      },
    },
    redirect: {
      login: "/login", // 未ログイン時のリダイレクト先
      logout: "/", // ログアウト処理を実行した直後のリダイレクト先
      callback: "/callback", // コールバックURL
      home: "/", // ログイン後に遷移するページ
    },
  },
};
