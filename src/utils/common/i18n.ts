/*
 * @Author: jdm
 * @Date: 2024-08-07 11:04:18
 * @LastEditors: jdm
 * @LastEditTime: 2024-08-20 18:21:58
 * @FilePath: \vite-vue3-jdm\src\utils\common\i18n.ts
 * @Description:
 *
 */
// src/utils/common/i18n.ts

import { i18n } from '@/locales/index';
import type { NDateLocale, NLocale } from 'naive-ui';
import { dateEnUS, dateZhCN, enUS, zhCN } from 'naive-ui';

export function setLocale(locale: App.lang) {
  if (isRef(i18n.global.locale)) {
    i18n.global.locale.value = locale;
  } else {
    throw new Error('i18n.global.locale is not a ref');
  }
}

export const naiveI18nOptions: Record<
  App.lang,
  { locale: NLocale | null; dateLocale: NDateLocale | null }
> = {
  zhCN: {
    locale: zhCN,
    dateLocale: dateZhCN,
  },
  enUS: {
    locale: enUS,
    dateLocale: dateEnUS,
  },
};
