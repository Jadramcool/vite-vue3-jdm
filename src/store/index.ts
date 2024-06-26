// 创建pinia实例
// store/index.ts
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const store = createPinia();

store.use(piniaPluginPersistedstate); // 使用持久化插件

export default store;
export * from './modules';
