<!--
 * @Author: Jay
 * @Date: 2024-04-13 15:45:42
 * @LastEditors: Jay
 * @LastEditTime: 2024-07-23 11:23:22
 * @FilePath: \vite-vue3-jdm\src\components\common\Watermark.vue
 * @Description: 
 * 
-->
<template>
  <n-watermark
    v-if="props.showWatermark"
    :content="props.text"
    cross
    fullscreen
    :font-size="16"
    :line-height="16"
    :width="384"
    :height="384"
    :x-offset="12"
    :y-offset="60"
    :rotate="-15"
  />
</template>

<script lang="ts" setup>
interface Props {
  showWatermark: boolean;
  text?: string;
}
const props = withDefaults(defineProps<Props>(), {
  showWatermark: false,
  text: '这是一个水印',
});
</script>
