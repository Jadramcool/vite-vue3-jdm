<template>
  <n-form ref="formRef" inline :label-width="80">
    <n-form-item label="姓名">
      <n-input placeholder="输入姓名" />
    </n-form-item>
  </n-form>
</template>

<script setup lang="ts">
defineOptions({ name: 'BasicForm' });
</script>

<style lang="scss" scoped>
.read-the-docs {
  color: #888;
}
</style>
