<!--
 * @Author: Jay
 * @Date: 2024-05-30 13:50:03
 * @LastEditors: Jay
 * @LastEditTime: 2024-07-24 15:32:11
 * @FilePath: \vite-vue3-jdm\src\components\jayTable\src\Table.vue
 * @Description: 自定义表格封装
 * 
-->
<template>
  <n-button @click="test">测试</n-button>
  <tool-bar />
  <n-data-table
    ref="dataTable"
    v-bind="getTableValue"
    :striped="isStriped"
    :bordered="isBordered"
    @update:page="updatePage"
    @update:page-size="updatePageSize"
  />
</template>

<script setup lang="ts">
import { usePagination, useDataSource, useLoading } from './hooks';
import { basicProps } from './props';
import { ToolBar } from './components';

defineOptions({ name: 'JayTable' });
const dataTable = ref<any>(null);

const props = defineProps(basicProps);
// 获取props
const getProps = computed(() => {
  return { ...props };
});
// -----------自定义配置-----------
const isStriped = ref(true); // 是否显示斑马线标识符
const isBordered = ref(false); // 是否显示边框
// -----------自定义配置-----------

// -----------loading处理-----------
// 获取表格加载动画的钩子函数
const { getLoading, setLoading } = useLoading(getProps);

// -----------分页处理-----------
const { getPaginationInfo, setPagination } = usePagination(getProps);
// 分页数据
const pagination = computed(() => toRaw(unref(getPaginationInfo)));

// -----------表格数据处理-----------
const { getDataSourceRef, reload } = useDataSource(getProps, {
  getPaginationInfo,
  setPagination,
  useLoading,
  setLoading,
});

// 表格数据,组装表格信息
const getTableValue: any = computed(() => {
  const tableData = unref(getDataSourceRef);
  return {
    ...unref(getProps),
    data: tableData,
    pagination: pagination.value,
    loading: unref(getLoading),
    remote: true,
  };
});

/**
 * @description: 更新页面（切换页面）
 * @param {*} page
 */
const updatePage = (page: any) => {
  setPagination({ page });
  reload(page);
};

/**
 * @description: 每页显示数量切换
 * @param {*} size
 */
const updatePageSize = (size: any) => {
  setPagination({ page: 1, pageSize: size });
  reload({});
};

const test = () => {};
</script>

<style lang="scss" scoped>
.read-the-docs {
  color: #888;
}
</style>
