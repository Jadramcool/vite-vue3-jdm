/*
 * @Author: jdm
 * @Date: 2024-08-07 11:04:18
 * @LastEditors: jdm
 * @LastEditTime: 2024-08-20 17:36:55
 * @FilePath: \vite-vue3-jdm\src\locales\index.ts
 * @Description:
 *
 */
// src/locales/index.ts

import { lStorage } from '@/utils';
import { createI18n, I18n, I18nOptions } from 'vue-i18n';

// 动态导入语言包
async function loadLocaleMessages(locales: string[]) {
  const messages: Record<string, any> = {};

  // 创建一个包含所有导入操作的 Promise 数组
  const importPromises = locales.map(async (locale) => {
    try {
      const module = await import(`../../locales/${locale}.json`);
      messages[locale] = module.default;
    } catch (error) {
      console.error(`Failed to load locale messages for ${locale}:`, error);
      messages[locale] = {}; // 返回一个空对象以避免后续代码出错
    }
  });

  // 等待所有导入操作完成
  await Promise.all(importPromises);

  return messages;
}

const i18nInstance: I18n = await createI18nInstance();

async function createI18nInstance(): Promise<I18n> {
  const lang: string = lStorage.getItem('lang') || 'zhCN';

  const messages: Record<string, any> = await loadLocaleMessages(['zhCN', 'enUS']);

  const i18nOptions: I18nOptions = {
    locale: lang,
    fallbackLocale: 'zhCN',
    globalInjection: true,
    legacy: false,
    messages,
    silentFallbackWarn: true,
    silentTranslationWarn: true,
    missingWarn: false,
    fallbackWarn: false,
    missing: (locale, key) => {
      console.log('locale:', locale);
      console.warn(`翻译缺失: ${key}`);
      return key;
    },
  };

  const i18nInstance: I18n = createI18n(i18nOptions);

  return i18nInstance;
}

export const i18n: I18n = i18nInstance;
