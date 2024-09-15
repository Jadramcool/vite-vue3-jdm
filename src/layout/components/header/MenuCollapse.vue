<template>
  <n-flex
    class="cursor-pointer rounded-4 p-6px text-22px transition-all-300"
    @click="appStore.switchCollapsed"
  >
    <i :class="appStore.collapsed ? 'i-line-md-menu-unfold-left' : 'i-line-md-menu-fold-left'" />
  </n-flex>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store';

const appStore = useAppStore();
</script>

<style lang="scss" scoped></style>
