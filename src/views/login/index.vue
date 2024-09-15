<template>
  <div
    class="login wh-full flex justify-center items-center"
    :class="appStore.colorMode === 'dark' ? 'login-body-dark' : 'login-body'"
  >
    <div class="card bg-primary_hover card-shadow p-20px flex-x-center justify-around">
      <img
        class="rounded-lg opacity-80 <md:hidden"
        src="../../assets/images/login_banner.png"
        alt=""
      />
      <Transition :name="appStore.transitionAnimation" mode="out-in">
        <component :is="formComponets[formType]" v-model="formType" class="w-85%" />
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store';
import { Login, Register } from './components';

const appStore = useAppStore();

type IformType = 'login' | 'register' | 'resetPwd';
const formType: Ref<IformType> = ref('login');
const formComponets: any = {
  login: Login,
  register: Register,
};
</script>

<style lang="scss" scoped>
.login {
  background-size: 400%;
  animation: bganimation 10s ease infinite;
  .card {
    width: 60%;
    max-width: 800px;
    min-width: 300px;
    height: 450px;
    border-radius: 10px;
    img {
      max-width: 45%;
      max-height: 90%;
    }
  }
}

.login-body-dark {
  background-image: linear-gradient(125deg, #73787e, #374c83, #6ca5c0, #44ac78);
  .card {
    background-color: rgba($color: $card-bg-dark, $alpha: 0.6);
  }
}
.login-body {
  background-image: linear-gradient(125deg, #4facfe, #a1c4fd, #c2e9fb, #c2ffd8);
  .card {
    background-color: rgba($color: $card-bg, $alpha: 0.6);
  }
}

/* 动画，控制背景 background-position */
@keyframes bganimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
