<template>
  <TransitionGroup
    v-if="appStore.showBreadcrumb"
    name="list"
    tag="ul"
    style="display: flex; gap: 1em"
  >
    <n-el
      v-for="item in routes"
      :key="item.path"
      tag="li"
      class="flex-center gap-2 cursor-pointer split"
      @click="router.push(item.path)"
    >
      <jay-icon :icon="item.meta.icon as string" v-if="appStore.showBreadcrumbIcon" />
      <!-- <span class="whitespace-nowrap">{{ t(`route.${String(item.name)}`, item.meta.title) }}</span> -->
      <span class="whitespace-nowrap">{{ item.meta.title }}</span>
    </n-el>
  </TransitionGroup>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store';

const router = useRouter();
const route = useRoute();
const routes = computed(() => {
  return route.matched;
});
const appStore = useAppStore();
</script>

<style lang="scss" scoped>
.split:not(:first-child)::before {
  content: '/';
  padding-right: 0.6em;
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(45px);
}

.list-leave-active {
  position: absolute;
  left: 25%;
}
</style>
