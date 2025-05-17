import { defineConfig } from 'dumi';

export default defineConfig({
  apiParser: {},
  resolve: {
    // 配置入口文件路径，API 解析将从这里开始
    entryFile: './src/index.tsx',
  },
  themeConfig: {
    name: 'tree-graph',
    logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  },
  favicons:
    ['https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png'],
  outputPath: 'docs-dist',
  // more config: https://d.umijs.org/config
});
