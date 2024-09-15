<!--
 * @Author: Jay
 * @Date: 2024-05-30 10:29:46
 * @LastEditors: jdm
 * @LastEditTime: 2024-08-21 16:29:28
 * @FilePath: \vite-vue3-jdm\src\views\system\user\index.vue
 * @Description: 
 * 
-->
<template>
  <div>
    <!-- <BasicForm></BasicForm> -->
    <JayTable :columns="columns" :pagination="{ pageSize: 10 }" :request="loadUserList"></JayTable>
  </div>
</template>

<script lang="ts" setup>
import { JayTable } from '@/components/jayTable';
// import { BasicForm } from '@/components/Form';
import { UserManagerApi } from '@/api/system';

defineOptions({ name: 'UserManager' });

onMounted(() => {
  // getUserList();
  // loadUserList();
});

const columns = [
  {
    title: 'ID',
    key: 'id',
  },
  {
    title: '用户名',
    key: 'username',
  },
  {
    title: '性别',
    key: 'sex',
  },
  {
    title: '创建时间',
    key: 'createdTime',
  },
  {
    title: '更新时间',
    key: 'updatedTime',
  },
];
const params = ref<Query.GetParams>({
  filters: {
    username_in: '1',
    // username_not_in: 'jdm',
    sex: 'OTHER',
  },
});

const handleParams = (params: any) => {
  return params;
};

const loadUserList = async (data: any) => {
  console.log(handleParams(params.value));
  // return UserManagerApi.userList(handleParams(params.value));
  return UserManagerApi.userList({ ...data, ...handleParams(params.value) });
};

// const loadUserList = (res: any) => {
//   return getUserList({ ...res, ...params });
// };
// const getUserList = async (param: any) => {
//   // const res: any = await UserManagerApi.userList({
//   //   // filters: {
//   //   //   username: 'jdm3',
//   //   // },
//   //   pageInfo: { page: 1, pageSize: 3 },
//   // });

//   const res = await UserManagerApi.userList(param);
//   return res;
// };
</script>
