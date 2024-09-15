/*
 * @Author: jdm
 * @Date: 2024-08-01 18:30:07
 * @LastEditors: jdm
 * @LastEditTime: 2024-08-26 10:10:35
 * @FilePath: \vite-vue3-jdm\src\main.ts
 * @Description:
 *
 */
import { i18n } from '@/locales';
import 'virtual:uno.css';
import { createApp } from 'vue';
import App from './App.vue';
import './assets/styles/style.scss';
import { setupRouter } from './router';
import store from './store/index'; // 在vue中使用pinia
import './style.css';

console.log(`main1`);

const start = async () => {
  const app = createApp(App);
  console.log('main2');

  // 初始化 i18n 实例
  // const i18n = await createI18nInstance();
  // console.log('🚀 ~ start ~ i18n:', i18n);
  app.config.globalProperties.$t = i18n.global.t;
  app.use(i18n);

  app.use(store);

  // 注册路由
  await setupRouter(app);

  app.mount('#app');

  // 在生产环境中使用mock服务
  if (process.env.NODE_ENV === 'production') {
    import('./mockProdServer').then(({ setupProdMockServer }) => {
      setupProdMockServer();
    });
  }
};

start();
