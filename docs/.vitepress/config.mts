import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "webts API",
  description: "聚集多种类型的 API 接口平台及实现",
  lastUpdated: true,
  // base: "/webts/",
  markdown: {
    lineNumbers: true, // 启用行号
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      { text: "文档", link: "/quickStart" },
      {
        text: "关于",
        items: [
          { text: "关于我们", link: "/about/us" },
          { text: "友链", link: "/about/like" },
          { text: "合作", link: "/about/cooperate" },
          // { text: "团队", link: "/team" },
        ],
      },
    ],

    sidebar: [
      {
        items: [
          {
            text: "快速开始",
            link: "/quickStart",
          },

          {
            text: "API",
            items: [
              { text: "IP 地址", link: "/api/ip" },
              { text: "地理位置", link: "/api/code" },
              { text: "天气", link: "/api/weatherInfo" },
              { text: "历史上的今天", link: "/api/today" },
              { text: "翻译", link: "/api/translate" },
              { text: "热搜", link: "/api/resou" },
            ],
          },

          {
            text: "第三方 API",
            items: [
              {
                text: "Demo01",
                items: [
                  {
                    text: "天气",
                    link: "/third/demo01/weatherInfo",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/orange-juzipi/webts" },
    ],

    search: {
      provider: "local",
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: "搜索文档",
                buttonAriaLabel: "搜索文档",
              },
              modal: {
                footer: {
                  selectText: "选择",
                  navigateText: "切换",
                  closeText: "关闭",
                  selectKeyAriaLabel: "搜索提供者",
                },
                noResultsText: "无法找到相关结果",
                resetButtonTitle: "清除查询条件",
              },
            },
          },
        },
      },
    },

    editLink: {
      pattern: "https://github.com/vuejs/vitepress/edit/main/docs/:path",
      text: "在 GitHub 上编辑此页面",
    },

    footer: {
      copyright: "Copyright © 2024-present webts",
    },
  },
});
