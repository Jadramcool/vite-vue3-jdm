/*
 * @Author: Jay
 * @Date: 2024-05-30 13:50:03
 * @LastEditors: Jay
 * @LastEditTime: 2024-07-24 15:05:40
 * @FilePath: \vite-vue3-jdm\src\components\jayTable\src\hooks\usePagination.ts
 * @Description: 分页数据获取
 *
 */
import { isBoolean } from '@/utils/common';
import { APISETTING, DEFAULTPAGESIZE, PAGESIZES } from '../const';

export const usePagination = (refProps: any) => {
  const configRef = ref<any>({});
  const show = ref<boolean>(true);

  const getPaginationInfo = computed(() => {
    // 从父传子值中查看是否开启了分页
    const { pagination } = unref(refProps);
    if (!unref(show) || (isBoolean(pagination) && !pagination)) {
      // 未开启，直接返回false
      return false;
    }

    // 获取接口返回总页数字段名
    const { totalField, itemCountField } = APISETTING;
    const config = unref(configRef);
    // 如果有pageSize字段，并且pageSize不为空，PAGESIZES中不包含pageSize，则添加到PAGESIZES中
    const pageSizes = config.pageSizes || PAGESIZES;
    if (config?.pageSize && !pageSizes.includes(config.pageSize)) {
      // 按由小到大插入进去
      const index = pageSizes.findIndex((item: number) => item > config.pageSize);
      pageSizes.splice(index, 0, config.pageSize);
    }
    return {
      pageSize: DEFAULTPAGESIZE, // 默认每页数量
      pageSizes, // 默认可切换每页数量
      showSizePicker: true,
      showQuickJumper: true,
      ...(isBoolean(pagination) ? {} : pagination),
      ...config,
      pageCount: config[totalField],
      itemCount: config[itemCountField] || 0,
      prefix: (info: any) => `共${info.itemCount}条，共${info.pageCount}页`,
      onUpdatePage: () => {},
      onUpdatePageSize: () => {},
    };
  });

  /**
   * 分页信息钩子函数，设置分页的当前页和总页数
   * @param {*} info
   */
  const setPagination = (info: any) => {
    const paginationInfo = unref(getPaginationInfo);
    configRef.value = {
      ...(!isBoolean(paginationInfo) ? paginationInfo : {}),
      ...info,
    };
  };

  /**
   * @description: 获取分页信息
   * @return {*}
   */
  const getPagination = (): any => {
    return unref(getPaginationInfo);
  };

  /**
   * @description: 获取是否显示分页
   * @return {*}
   */
  const getShowPagination = (): boolean => {
    return unref(show);
  };

  /**
   * @description: 设置是否显示分页
   * @param {boolean} flag
   * @return {*}
   */
  const setShowPagination = async (flag: boolean): Promise<void> => {
    show.value = flag;
  };

  return { getPaginationInfo, getPagination, setPagination, getShowPagination, setShowPagination };
};
