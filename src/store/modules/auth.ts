import { defineStore } from 'pinia';
import { setToken as setTokenLocal } from '@/utils';
// import { useUserStore, usePermissionStore, useTabStore } from '@/store';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: undefined,
  }),
  actions: {
    setToken({ token }: any) {
      this.token = token;
      setTokenLocal(token);
    },
    resetToken() {
      this.$reset();
    },
    toLogin() {
      const router = useRouter();
      // const { router, route } = useRouterStore();
      router.replace({
        path: '/login',
        // query: route.query,
      });
    },
    async switchCurrentRole(data: any) {
      this.resetLoginState();
      await nextTick();
      this.setToken(data);
    },
    resetLoginState() {
      // const { resetUser } = useUserStore();
      // const { resetRouter } = useRouterStore();
      // const { resetPermission, accessRoutes } = usePermissionStore();
      // const { resetTabs } = useTabStore();
      // // 重置路由
      // resetRouter(accessRoutes);
      // // 重置用户
      // resetUser();
      // // 重置权限
      // resetPermission();
      // // 重置Tabs
      // resetTabs();
      // // 重置token
      // this.resetToken();
    },
    async logout() {
      this.resetLoginState();
      // this.toLogin();
    },
  },
  persist: true,
});
