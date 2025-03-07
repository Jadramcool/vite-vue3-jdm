<template>
  <n-spin :show="loading">
    <n-descriptions v-bind="getProps">
      <n-descriptions-item
        v-for="(item, index) in descriptions"
        :key="index"
        :span="item?.span || 1"
      >
        <template #label>
          <n-text class="font-bold">{{ item.description.label }}</n-text>
        </template>
        <template #default>
          <template v-if="item.description.render">
            <template v-if="typeof item.description.render === 'string'">
              {{ item.description.render }}
            </template>
            <component v-else :is="item.description.render" />
          </template>
          <template v-else>{{ item.description.value }}</template>
        </template>
      </n-descriptions-item>
    </n-descriptions>
  </n-spin>
</template>

<script setup lang="ts" name="BasicTable">
import { get } from 'lodash';
import { computed } from 'vue';
import { basicProps } from './props';

defineOptions({ name: 'BasicTable' });

const props = defineProps(basicProps);
const getProps = computed(() => ({
  ...props,
}));

const dataSource = computed(() => getProps.value.data);
const getSchemas = computed(() => getProps.value.schemas);
const loading = computed(() => getProps.value.loading);

const descriptions = ref<any[]>([]);

const generateDescription = () => {
  const desc: any[] = [];
  if (!getSchemas.value || !dataSource.value) return desc;

  getSchemas.value.forEach((item: any) => {
    try {
      const render =
        item.render && typeof item.render === 'function' ? item.render(dataSource.value) : null;
      desc.push({
        ...item,
        description: {
          label: item.label || '',
          value: get(dataSource.value, item.field, ''),
          render,
        },
      });
    } catch (error) {
      console.error(`Error generating description for field ${item.field}:`, error);
    }
  });

  return desc;
};

// onMounted(() => {
//   descriptions.value = generateDescription();
// });

watch(
  () => dataSource.value,
  () => {
    if (!dataSource.value) return;
    // 判断 dataSource 是否是空对象
    if (Object.keys(dataSource.value).length === 0) {
      descriptions.value = [];
      return;
    }
    descriptions.value = generateDescription();
  },
  { deep: true, immediate: true },
);
</script>

<style lang="scss" scoped></style>
