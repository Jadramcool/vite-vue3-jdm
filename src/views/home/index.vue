<template>
  <div>
    <div class="test">home</div>
    <n-button type="warning" @click="handleLogout">退出登录</n-button>
    <n-button type="warning" @click="handlePage">跳转路由</n-button>
  </div>
</template>

<script setup lang="ts">
// import { setToken } from '@/utils/token';
import { lStorage } from '@/utils/storage';
import * as ExampleApi from '@/api/example';

const router = useRouter();
const handleLogout = () => {
  lStorage.clearAll();
};

onMounted(() => {
  setTimeout(() => {
    getData();
  }, 3000);
});

const getData = async () => {
  const res = await ExampleApi.mockGetUserInfoAPI();
  console.log('🚀 ~ getData ~ res:', res);
};

const handlePage = () => {
  router.push('/base/components');
};
</script>

<style lang="scss" scoped>
.test {
  color: var(--primary-color) !important;
}
</style>
