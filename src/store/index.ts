/*
 * @Author: jdm
 * @Date: 2024-04-08 10:19:16
 * @LastEditors: jdm
 * @LastEditTime: 2024-08-20 15:17:09
 * @FilePath: \vite-vue3-jdm\src\store\index.ts
 * @Description:
 *
 */
// 创建pinia实例
// store/index.ts
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const store = createPinia();

store.use(piniaPluginPersistedstate); // 使用持久化插件

export default store;
export * from './modules';
