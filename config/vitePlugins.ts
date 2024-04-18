// vitePlugins.ts
import type { Plugin } from 'vite';
import vue from '@vitejs/plugin-vue';

// 自动引入插件
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
// mock 服务
import { viteMockServe } from 'vite-plugin-mock';
// Naive UI 的解析器
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
// UnoCSS
import UnoCSS from 'unocss/vite';
import { ConfigEnv } from 'vite';

export default (env: ConfigEnv) => {
  console.log('🚀 ~ env:', env);
  const vitePlugins: (Plugin | Plugin[])[] = [
    vue({
      include: [/.vue$/],
    }),
    UnoCSS(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'pinia',
        {
          'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar'],
        },
        '@vueuse/core',
        'vue-i18n',
      ],
      // 指定哪些文件应该被自动导入。
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
      eslintrc: {
        enabled: true, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
      dts: 'typings/auto-imports.d.ts',
    }),
    Components({
      // dirs 指定组件所在位置，默认为 src/components
      // 可以让我们使用自己定义组件的时候免去 import 的麻烦
      dirs: ['src/components'],
      // 配置需要将哪些后缀类型的文件进行自动按需引入
      extensions: ['vue'],
      // 解析的 UI 组件库，这里以 NaiveUI 为例
      resolvers: [NaiveUiResolver()],
      dts: 'typings/components.d.ts',
    }),
    viteMockServe({
      // 模拟服务的文件夹，在设置了configPath后失效
      mockPath: 'mock',
      // 是否实时更新
      watchFiles: true,
      // 是否启用
      enable: true,
      // 是否显示日志
      logger: true,
    }),
  ];

  return vitePlugins;
};
