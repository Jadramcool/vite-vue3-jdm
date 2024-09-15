<template>
  <div class="login-content h-full md:w-45% <md:w-90% flex-col flex-x-center justify-start py-10px">
    <div class="header flex-x-center">
      <TheLogo></TheLogo>
      <div class="title text-xl text-primary mx-10px">{{ $t('login.title') }}</div>
    </div>
    <div class="text-xl text-primary mt-10px">{{ $t('login.login') }}</div>
    <div class="login-form mt-20px w-90% max-w-340px mx-auto">
      <n-form
        ref="loginFormRef"
        :label-width="80"
        label-placement="left"
        :model="loginForm"
        :show-label="appStore.loginSet.formShowLabel"
        :rules="loginFormRules"
        size="large"
      >
        <n-form-item :label="$t('login.username')" path="username">
          <n-input
            v-model:value="loginForm.username"
            :placeholder="$t('common.pleaseInput') + ' ' + $t('login.username')"
          >
            <template #prefix> <JayIcon :icon="'solar:user-rounded-line-duotone'" /> </template>
          </n-input>
        </n-form-item>
        <n-form-item :label="$t('login.password')" path="password">
          <n-input
            type="password"
            show-password-on="click"
            v-model:value="loginForm.password"
            :maxlength="common.passwordMaxLength"
            :placeholder="$t('common.pleaseInput') + ' ' + $t('login.password')"
          >
            <template #prefix>
              <JayIcon :icon="'solar:lock-password-line-duotone'" />
            </template>
          </n-input>
        </n-form-item>
        <n-form-item>
          <div class="w-full flex-x-center justify-between" align="center">
            <n-checkbox v-model:checked="isRemember" @update:checked="handleIsRemember">
              {{ $t('login.isRemember') }}
            </n-checkbox>
            <n-a> {{ $t('login.forgetPassword') }}? </n-a>
          </div>
        </n-form-item>
      </n-form>

      <div class="flex justify-around">
        <n-button class="min-w-100px" type="info" @click="handleExperience">{{
          $t('login.experience')
        }}</n-button>
        <n-button class="min-w-100px" type="primary" @click="handleLogin">{{
          $t('login.login')
        }}</n-button>
      </div>

      <n-p class="flex-x-center">
        <n-space>
          {{ $t('login.registerTips') }}
          <n-a @click="toOtherForm('register')">{{ $t('login.register') }}</n-a>
        </n-space>
      </n-p>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as UserApi from '@/api/user';
import { lStorage } from '@/utils/storage';
import { useAuthStore, useAppStore } from '@/store';
import TheLogo from '@/components/common/TheLogo.vue';
import { common } from '@/config';
import { FormRules, FormItemRule, FormInst } from 'naive-ui';
// 引入i18n
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const emit = defineEmits(['update:modelValue']);

interface LoginForm {
  username: string;
  password: string;
}

const router = useRouter();
const route = useRoute();

const authStore = useAuthStore();
const appStore = useAppStore();

const loginFormRef = ref<FormInst | null>(null);

const loginForm = ref<LoginForm>({
  username: 'jdm',
  password: '123456',
});

// 登录表单验证规则
const loginFormRules: FormRules = {
  username: [
    {
      required: true,
      message: `${t('common.pleaseInput')} ${t('login.username')}`,
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      trigger: ['blur', 'input'],
      validator: (_rule: FormItemRule, value: string) => {
        if (!value) {
          return new Error(t('common.pleaseInput') + t('login.password'));
        }
        if (value.length < common.passwordMinLength) {
          return new Error(
            `${t('login.passwordMinLength')} ${common.passwordMinLength} ${t('login.length')}`,
          );
        }
        if (value.length > common.passwordMaxLength) {
          return new Error(
            `${t('login.passwordMaxLength')} ${common.passwordMaxLength} ${t('login.length')}`,
          );
        }
        return Promise.resolve();
      },
    },
  ],
};

const isRemember = ref<boolean>(false);

onMounted(async () => {
  await checkLocalAccount();
});

const toOtherForm = (type: any) => {
  emit('update:modelValue', type);
};

// 是否记住密码
const handleIsRemember = () => {
  if (isRemember.value) {
    window.$notification.info({
      title: `${t('login.isRememberTips')}`,
      duration: 3000,
      keepAliveOnHover: true,
    });
  }
};

// 检查本地账号
const checkLocalAccount = () => {
  if (lStorage.getItem('loginForm')) {
    const account = lStorage.getItem('loginForm');
    loginForm.value.username = account.username;
    loginForm.value.password = account.password;
    isRemember.value = true;
  }
};

const handleLogin = async (e: MouseEvent) => {
  try {
    e.preventDefault();
    const messageReactive = window.$message.loading(`${t('login.status.logining')}...`, {
      duration: 0,
    });
    loginFormRef.value?.validate(async (errors) => {
      // console.log('🚀 ~ loginFormRef.value?.validate ~ valid:', errors);
      if (!errors) {
        const data = {
          username: loginForm.value.username,
          password: loginForm.value.password,
        };

        const res = await UserApi.login(data);
        onLoginSuccess(res);
      } else {
        const errorMessage: any = errors.map((item) => item[0].message).join('\n');
        console.log('🚀 ~ loginFormRef.value?.validate ~ errorMessage:', errorMessage);
        window.$notification.error({
          title: `${t('login.status.loginFailed')}`,
          content: errorMessage,
          duration: 3000,
          keepAliveOnHover: true,
        });
      }
      messageReactive.destroy();
    });
  } catch (error) {
    console.error(error);
  }
};

const handleExperience = async () => {
  window.$notification.info({
    title: '一键体验',
    meta: '一键体验功能暂未开放',
    duration: 3000,
    keepAliveOnHover: true,
  });
};
async function onLoginSuccess(data: any = {}) {
  // 存储登录表单
  if (isRemember.value) {
    lStorage.setItem('loginForm', loginForm.value);
  }
  authStore.setToken(data);
  try {
    if (route.query.redirect) {
      const path: string = route.query.redirect as string;
      delete route.query.redirect;
      router.push({ path, query: route.query });
    } else {
      router.push('/');
    }
  } catch (error) {
    console.error(error);
  }
}
</script>

<style lang="scss" scoped></style>
