import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'r-utils',
  favicon: 'https://s4.ax1x.com/2021/12/20/Tn4cNQ.png',
  logo: 'https://s4.ax1x.com/2021/12/20/Tn4cNQ.png',
  outputPath: 'docs-dist',
  base: '/r-utils', // 文档起始路由
  publicPath: '/r-utils/', // 静态资源起始路径
  exportStatic: {}, // 将所有路由输出为 HTML 目录结构，以免刷新页面时 404
  // more config: https://d.umijs.org/config

  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
    ],
  ],
});
