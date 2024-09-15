<template>
  <router-link class="h-60px flex-center" to="/">
    <!-- <img src="@/assets/images/logo.png" class="h-40px" /> -->
    <TheLogo class="rounded-8px!" />
    <h2
      v-show="!appStore.collapsed"
      class="ml-10px max-w-140px flex-shrink-0 text-16px color-primary font-bold"
    >
      {{ title }}
    </h2>
  </router-link>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store';

const appStore = useAppStore();

const title = import.meta.env.VITE_TITLE;
</script>
<style lang="scss"></style>
