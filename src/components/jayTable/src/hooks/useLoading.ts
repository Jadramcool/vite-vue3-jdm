/*
 * @Author: Jay
 * @Date: 2024-07-24 13:53:25
 * @LastEditors: Jay
 * @LastEditTime: 2024-08-01 14:02:59
 * @FilePath: \vite-vue3-jdm\src\components\jayTable\src\hooks\useLoading.ts
 * @Description: 表格加载状态
 *
 */
export const useLoading = (props: any) => {
  const loadingRef = ref(unref(props).loading);
  watch(
    () => unref(props).loading,
    (loading) => {
      loadingRef.value = loading;
    },
  );

  const getLoading = computed(() => unref(loadingRef));

  const setLoading = (value: boolean) => {
    loadingRef.value = value;
  };

  return {
    getLoading,
    setLoading,
  };
};
