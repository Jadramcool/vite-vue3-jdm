<template>
  <AppCard class="flex items-center px-12" border-b="1px solid light_border dark:dark_border">
    <span class="mx-6 opacity-20">|</span>

    <div class="flex flex-shrink-0 items-center px-12px text-18">
      <i
        class="mr-16 cursor-pointer"
        :class="isDark ? 'i-fe:moon' : 'i-fe:sun'"
        @click="toggleDark"
      />
      <i
        class="mr-16 cursor-pointer"
        :class="isFullscreen ? 'i-fe:minimize' : 'i-fe:maximize'"
        @click="toggle"
      />

      <i
        class="i-fe:github mr-16 cursor-pointer"
        @click="handleLinkClick('https://github.com/zclzone/vue-naive-admin/tree/2.x')"
      />
      <i
        class="i-simple-icons:gitee mr-16 cursor-pointer"
        @click="handleLinkClick('https://gitee.com/isme-admin/vue-naive-admin/tree/2.x')"
      />
      <!-- <UserAvatar /> -->
    </div>
  </AppCard>
</template>

<script setup>
import { useDark, useToggle, useFullscreen } from '@vueuse/core';
import { useAppStore } from '@/store';

const appStore = useAppStore();
const isDark = useDark();
const toggleDark = () => {
  appStore.toggleDark();
  useToggle(isDark)();
};

const { isFullscreen, toggle } = useFullscreen();

function handleLinkClick(link) {
  window.open(link);
}
</script>
