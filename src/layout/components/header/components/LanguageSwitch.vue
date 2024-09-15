<!--
 * @Author: jdm
 * @Date: 2024-04-13 15:45:42
 * @LastEditors: jdm
 * @LastEditTime: 2024-08-20 14:56:02
 * @FilePath: \vite-vue3-jdm\src\layout\components\header\components\LanguageSwitch.vue
 * @Description: 
 * 
-->
<script setup lang="ts">
import { useAppStore } from '@/store';

const appStore = useAppStore();

const options = [
  {
    label: 'English',
    value: 'enUS',
  },
  {
    label: '中文',
    value: 'zhCN',
  },
];
</script>

<template>
  <n-popselect
    :value="appStore.lang"
    :options="options"
    trigger="click"
    @update:value="appStore.setAppLanguage"
  >
    <CommonWrapper>
      <JayIcon :icon="'icon-park-outline:translate'" />
    </CommonWrapper>
  </n-popselect>
</template>

<style scoped></style>
