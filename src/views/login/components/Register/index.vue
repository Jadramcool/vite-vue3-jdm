<template>
  <div class="login-content h-full md:w-45% <md:w-90% flex-col flex-x-center justify-start py-10px">
    <div class="header flex-x-center">
      <TheLogo></TheLogo>
      <div class="title text-xl text-primary mx-10px">{{ $t('login.title') }}</div>
    </div>
    <div class="text-xl text-primary mt-10px">{{ $t('login.register') }}</div>
    <div class="login-form mt-20px w-90% max-w-340px mx-auto">
      <n-form
        ref="registerFormRef"
        :label-width="80"
        label-placement="left"
        :model="registerForm"
        :show-label="appStore.loginSet.formShowLabel"
        :rules="registerFormRules"
        size="large"
      >
        <n-form-item :label="$t('login.username')" path="username">
          <n-input
            v-model:value="registerForm.username"
            :placeholder="$t('common.pleaseInput') + ' ' + $t('login.username')"
          >
            <template #prefix> <JayIcon :icon="'solar:user-rounded-line-duotone'" /> </template>
          </n-input>
        </n-form-item>
        <n-form-item :label="$t('login.password')" path="password">
          <n-input
            type="password"
            show-password-on="click"
            v-model:value="registerForm.password"
            :maxlength="common.passwordMaxLength"
            :placeholder="$t('common.pleaseInput') + ' ' + $t('login.password')"
          >
            <template #prefix>
              <JayIcon :icon="'solar:lock-password-line-duotone'" />
            </template>
          </n-input>
        </n-form-item>
        <n-form-item :label="$t('login.repeatPassword')" path="repeatPassword">
          <n-input
            type="password"
            show-password-on="click"
            v-model:value="registerForm.repeatPassword"
            :maxlength="common.passwordMaxLength"
            :placeholder="$t('common.pleaseInput') + ' ' + $t('login.repeatPassword')"
          >
            <template #prefix>
              <JayIcon :icon="'solar:lock-password-line-duotone'" />
            </template>
          </n-input>
        </n-form-item>
      </n-form>

      <div class="flex justify-around">
        <n-button class="min-w-100px" type="primary" @click="handleRegister">{{
          $t('login.register')
        }}</n-button>
      </div>

      <n-p class="flex-x-center"
        >{{ $t('login.loginTips')
        }}<n-a @click="toOtherForm('login')">{{ $t('login.login') }}</n-a></n-p
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import * as UserApi from '@/api/user';
import TheLogo from '@/components/common/TheLogo.vue';
import { common } from '@/config';
import { useAppStore } from '@/store';
import { FormInst, FormItemRule, FormRules } from 'naive-ui';

interface RegisterForm {
  username: string;
  password: string;
  repeatPassword: string;
}

const appStore = useAppStore();

const registerFormRef = ref<FormInst | null>(null);

const registerForm = ref<RegisterForm>({
  username: '123',
  password: '123456',
  repeatPassword: '123456',
});

const emit = defineEmits(['update:modelValue']);

// 登录表单验证规则
const registerFormRules: FormRules = {
  username: [
    {
      required: true,
      message: `${$t('common.pleaseInput')} ${$t('login.username')}`,
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      trigger: ['blur', 'input'],
      validator: (_rule: FormItemRule, value: string) => {
        if (!value) {
          return new Error($t('common.pleaseInput') + $t('login.password'));
        }
        if (value.length < common.passwordMinLength) {
          return new Error(
            `${$t('login.passwordMinLength')} ${common.passwordMinLength} ${$t('login.length')}`,
          );
        }
        if (value.length > common.passwordMaxLength) {
          return new Error(
            `${$t('login.passwordMaxLength')} ${common.passwordMaxLength} ${$t('login.length')}`,
          );
        }
        return Promise.resolve();
      },
    },
  ],
  repeatPassword: [
    {
      required: true,
      trigger: ['blur', 'input'],
      validator: (_rule: FormItemRule, value: string) => {
        if (!value) {
          return new Error($t('common.pleaseInput') + $t('login.repeatPassword'));
        }
        console.log(registerForm.value.password, value);
        if (value !== registerForm.value.password) {
          return new Error($t('login.passwordNotMatch'));
        }
        return Promise.resolve();
      },
    },
  ],
};

const toOtherForm = (type: any) => {
  emit('update:modelValue', type);
};

const messageReactive = ref<any>(null);

const handleRegister = async (e: MouseEvent) => {
  e.preventDefault();
  messageReactive.value = window.$message.loading(`${$t('login.status.registering')}...`, {
    duration: 0,
  });
  registerFormRef.value?.validate(async (errors) => {
    try {
      if (!errors) {
        const data = {
          username: registerForm.value.username,
          password: registerForm.value.password,
        };

        await UserApi.register(data);
        window.$notification.success({
          title: `${$t('login.status.registerSuccess')}`,
          duration: 3000,
          keepAliveOnHover: true,
        });
        // 跳转到登录页面
        toOtherForm('login');
      } else {
        const errorMessage: any = errors.map((item) => item[0].message).join('\n');
        window.$notification.error({
          title: `${$t('login.status.registerFailed')}`,
          content: errorMessage,
          duration: 3000,
          keepAliveOnHover: true,
        });
      }
    } catch (error: any) {
      window.$notification.error({
        title: `${$t('login.status.registerFailed')}`,
        content: error,
        duration: 3000,
        keepAliveOnHover: true,
      });
    } finally {
      messageReactive.value.destroy();
    }
  });
};
// async function onLoginSuccess(data: any = {}) {
//   authStore.setToken(data);
//   try {
//     if (route.query.redirect) {
//       const path: string = route.query.redirect as string;
//       delete route.query.redirect;
//       router.push({ path, query: route.query });
//     } else {
//       router.push('/');
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }
</script>

<style lang="scss" scoped></style>
