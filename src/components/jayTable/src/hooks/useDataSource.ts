/*
 * @Author: Jay
 * @Date: 2024-05-30 13:50:03
 * @LastEditors: Jay
 * @LastEditTime: 2024-07-24 14:14:24
 * @FilePath: \vite-vue3-jdm\src\components\jayTable\src\hooks\useDataSource.ts
 * @Description: 表格数据获取
 *
 */
import { isBoolean } from '@/utils/common';
import { APISETTING } from '../const';

export const useDataSource = (
  propsRef: any,
  { getPaginationInfo, setPagination, setLoading }: any,
) => {
  const dataSourceRef = ref([]);

  const getDataSourceRef = computed(() => {
    const dataSource = unref(dataSourceRef);
    if (!dataSource || dataSource.length === 0) {
      return unref(dataSourceRef);
    }
    return unref(dataSourceRef);
  });

  async function fetch(opt: any) {
    try {
      // 显示加载动画
      setLoading(true);

      const { request, pagination } = unref(propsRef);
      if (!request) return;

      // 分页信息字段名
      const { pageField, sizeField, totalField, itemCountField } = APISETTING;

      // 分页参数，当前页以及每页数量
      let pageParams: any = {};
      const { page = 1, pageSize = 10 } = unref(getPaginationInfo);

      // 额外请求参数
      const options: any = {};

      if ((isBoolean(pagination) && !pagination) || isBoolean(getPaginationInfo)) {
        // 没有开启分页
        pageParams = {};
        options.showPagination = false; // 关闭分页
      } else {
        // page，即当前页，如果opt参数中有的话，从opt中赋值/
        pageParams[pageField] = (opt && opt[pageField]) || page;
        pageParams[sizeField] = pageSize;
      }
      const params = {
        pagination: pageParams,
        options,
      };
      const res = await request(params);
      dataSourceRef.value = res.data;

      // 设置分页信息
      const pageInfo = res.pagination;
      if (pageInfo) {
        // 从结果中拿到总页数，缺省值为0。
        const resultTotal = pageInfo[totalField] || 0;
        // 从结果中拿到当前页
        const currentPage = pageInfo[pageField];
        // 从结果拿到总数据数
        const totalData = pageInfo[itemCountField];
        console.log(
          `resultTotal:${resultTotal}, currentPage:${currentPage}, totalData:${totalData}`,
        );

        // 赋予分页信息
        setPagination({
          [pageField]: currentPage,
          [totalField]: resultTotal,
          [itemCountField]: totalData,
        });
      }
    } catch (e) {
      console.log(e);
    } finally {
      // 不论成功与否，隐藏加载动画
      setLoading(false);
    }
  }

  onMounted(() => {
    setTimeout(() => {
      fetch({});
    }, 16);
  });

  // 获取表格数据
  function getDataSource() {
    return getDataSourceRef.value;
  }

  async function reload(opt: any) {
    await fetch(opt);
  }
  return { dataSourceRef, getDataSourceRef, getDataSource, fetch, reload };
};
