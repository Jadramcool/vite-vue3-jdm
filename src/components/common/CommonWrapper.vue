<script setup lang="ts"></script>

<template>
  <n-el class="el p-6px cursor-pointer rounded">
    <n-flex align="center" :wrap="false" class="h-full">
      <slot />
    </n-flex>
  </n-el>
</template>

<style lang="scss" scoped>
.el {
  color: var(--n-text-color);
  transition: 0.3s var(--cubic-bezier-ease-in-out);
}
.el:hover {
  background-color: var(--button-color-2-hover);
  color: var(--n-text-color-hover);
}
</style>
