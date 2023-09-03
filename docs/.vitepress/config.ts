import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Vue Table Accessible",
  description: "Vue table component",
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Documentation", link: "/table" },
    ],
    logo: "/favicon.ico",

    sidebar: [
      {
        text: "API Reference",
        items: [{ text: "Table", link: "/table" }],
      },
      {
        text: "Examples",
        items: [{ text: "Advanced", link: "/advanced" }],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/DarrenXu94/vue-table" },
    ],
  },
});
