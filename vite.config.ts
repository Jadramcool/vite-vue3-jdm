/*
 * @Author: Jay
 * @Date: 2024-05-06 10:22:58
 * @LastEditors: Jay
 * @LastEditTime: 2024-08-01 17:26:12
 * @FilePath: \vite-vue3-jdm\vite.config.ts
 * @Description:
 *
 */
import { defineConfig, loadEnv, ConfigEnv } from 'vite';
import path from 'path';

import vitePlugins from './config/vitePlugins';

// import { VITE_PORT, VITE_DROP_CONSOLE, API_BASE_URL, API_TARGET_URL } from './config/constant';

export default defineConfig((env: ConfigEnv) => {
  // 加载环境变量
  const viteEnv = loadEnv(env.mode, './env', 'VITE');
  console.log('🚀jay, viteEnv', viteEnv);
  return {
    base: viteEnv.VITE_BASE,
    envDir: './env', // 指定环境变量文件目录
    plugins: vitePlugins(env),
    resolve: {
      // 设置别名
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '#': path.resolve(__dirname, 'types'), // #代替types
      },
    },
    server: {
      host: '0.0.0.0',
      port: 4000,
      open: false,
      https: false,
      // proxy: {
      //   '/api': {
      //     target: '要代理的地址',
      //     changeOrigin: true,
      //     ws: true,
      //     rewrite: (path: string) => path.replace(/^\/api/, ''),
      //   },
      // },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/styles/index.scss";',
        },
      },
    },
  };
});
