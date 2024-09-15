<template>
  <n-layout class="wh-full flex" has-sider>
    <n-layout-sider
      :collapsed="appStore.collapsed"
      collapse-mode="width"
      :collapsed-width="64"
      :width="240"
      content-style="display: flex;flex-direction: column;min-height:100%;border-right: 1px solid var(--border-color);"
    >
      <SideLogo v-if="appStore.showLogo" />
      <n-scrollbar class="flex-1">
        <SideMenu />
      </n-scrollbar>
    </n-layout-sider>
    <n-layout
      class="layout h-full flex flex-col"
      content-style="display: flex;flex-direction: column"
      embedded
    >
      <n-layout-header bordered class="z-1 flex-x-center justify-between">
        <div class="flex-x-center h-60px">
          <div class="flex-x-center h-full">
            <MenuCollapse />
            <Breadcrumb v-if="appStore.showBreadcrumb" />
          </div>
        </div>
        <div class="info flex-x-center gap-1 h-full p-x-xl">
          <HeaderTools />
        </div>
      </n-layout-header>
      <n-layout-header embedded>
        <TabBar v-if="appStore.showTabs"></TabBar>
      </n-layout-header>
      <n-layout-content embedded class="h-full flex-1 overflow-hidden" :native-scrollbar="true">
        <div class="wh-full flex-col">
          <AppCard class="cus-scroll m-12px h-0 flex-1 rounded-8px p-24px" bordered>
            <Transition :name="appStore.transitionAnimation" mode="out-in">
              <slot />
            </Transition>
          </AppCard>
        </div>
        <!-- <slot name="default"></slot> -->
      </n-layout-content>
      <n-layout-footer bordered class="h-40px" v-if="appStore.showFooter">
        <AppCard class="flex-1 h-full flex-center">
          <Footer />
        </AppCard>
      </n-layout-footer>
    </n-layout>
  </n-layout>
</template>

<script setup>
import { useAppStore } from '@/store';
import {
  SideLogo,
  SideMenu,
  MenuCollapse,
  Breadcrumb,
  HeaderTools,
  TabBar,
  Footer,
} from '@/layout/components';

const appStore = useAppStore();
</script>

<style lang="scss" scoped></style>
