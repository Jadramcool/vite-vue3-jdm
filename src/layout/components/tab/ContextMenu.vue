<template>
  <n-dropdown
    :show="show"
    :options="options"
    :x="x"
    :y="y"
    placement="bottom-start"
    @clickoutside="handleHideDropdown"
    @select="handleSelect"
  />
</template>

<script lang="ts" setup>
import { useTabStore, useAppStore } from '@/store';

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  currentPath: {
    type: String,
    default: '',
  },
  x: {
    type: Number,
    default: 0,
  },
  y: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(['update:show']);

const tabStore = useTabStore();
const appStore = useAppStore();

const options = computed(() => [
  {
    label: '重新加载',
    key: 'reload',
    disabled: props.currentPath !== tabStore.activeTab,
    icon: () => h('i', { class: 'i-mdi:refresh text-14px' }),
  },
  {
    label: '关闭',
    key: 'close',
    disabled: tabStore.tabs.length <= 1,
    icon: () => h('i', { class: 'i-mdi:close text-14px' }),
  },
  {
    label: '关闭其他',
    key: 'close-other',
    disabled: tabStore.tabs.length <= 1,
    icon: () => h('i', { class: 'i-mdi:arrow-expand-horizontal text-14px' }),
  },
  {
    label: '关闭左侧',
    key: 'close-left',
    disabled: tabStore.tabs.length <= 1 || props.currentPath === tabStore.tabs[0].path,
    icon: () => h('i', { class: 'i-mdi:arrow-expand-left text-14px' }),
  },
  {
    label: '关闭右侧',
    key: 'close-right',
    disabled:
      tabStore.tabs.length <= 1 ||
      props.currentPath === tabStore.tabs[tabStore.tabs.length - 1].path,
    icon: () => h('i', { class: 'i-mdi:arrow-expand-right text-14px' }),
  },
]);

const actionMap = new Map([
  // [
  //   'reload',
  //   () => {
  //     tabStore.reloadTab(route.fullPath, route.meta?.keepAlive as boolean);
  //   },
  // ],
  [
    'reload',
    () => {
      appStore.reloadPage();
    },
  ],

  [
    'close',
    () => {
      tabStore.removeTab(props.currentPath);
    },
  ],
  [
    'close-other',
    () => {
      tabStore.removeOther(props.currentPath);
    },
  ],
  [
    'close-left',
    () => {
      tabStore.removeLeft(props.currentPath);
    },
  ],
  [
    'close-right',
    () => {
      tabStore.removeRight(props.currentPath);
    },
  ],
]);

function handleHideDropdown() {
  emit('update:show', false);
}

function handleSelect(key: any) {
  const actionFn = actionMap.get(key);
  if (actionFn) {
    actionFn();
  }
  // actionFn && actionFn();
  handleHideDropdown();
}
</script>

<style lang="scss" scoped></style>
