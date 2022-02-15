// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

const redocusaurus = [
  "redocusaurus",
  {
    debug: Boolean(process.env.DEBUG || process.env.CI),
    specs: [
      {
        spec: "./assets/Seknot.yml",
        routePath: "/api",
      },
    ],
  },
];

/** @type {import("@docusaurus/types").Config} */
const config = {
  title: "Seknot",
  tagline: "あなただけの暗号資産で新しい世界を",
  url: "https://docs.seknot.net",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "seknot", // Usually your GitHub org/user name.
  projectName: "seknot", // Usually your repo name.
  presets: [
    redocusaurus,
    [
      "@docusaurus/preset-classic",
      {
        debug: Boolean(process.env.DEBUG || process.env.CI),
        theme: { customCss: [require.resolve("./src/css/custom.css")] },
        docs: {
          routeBasePath: "/docs",
          editUrl: "https://github.com/rohit-gohri/redocusaurus/edit/main/",
        },
      },
    ],
  ],
  themeConfig:
    /** @type {import("@docusaurus/preset-classic").ThemeConfig} */
    ({
      navbar: {
        title: "Document",
        logo: {
          alt: "Seknot Logo",
          src: "img/logo.svg",
        },
        items: [
          {
            type: "doc",
            docId: "intro",
            position: "left",
            label: "Tutorial",
          },
          {
            position: "left",
            label: "API Docs",
            to: "/api",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Tutorial",
                to: "/docs/intro",
              },
            ],
          },
          {
            title: "Seknot",
            items: [
              // {
              //   label: "Stack Overflow",
              //   href: "https://stackoverflow.com/questions/tagged/docusaurus",
              // },
              // {
              //   label: "Discord",
              //   href: "https://discordapp.com/invite/docusaurus",
              // },
              {
                label: "Twitter",
                href: "https://twitter.com/KOU3141592",
              },
            ],
          },
          {
            title: "More",
            items: [
              // {
              //   label: "Blog",
              //   to: "/blog",
              // },
              {
                label: "GitHub",
                href: "https://github.com/seknot",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Seknot.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
  plugins: ["docusaurus-plugin-redoc"],
};

module.exports = config;
