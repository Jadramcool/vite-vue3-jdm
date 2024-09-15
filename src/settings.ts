export const defaultLayout = 'normal';
// 全局主题变量
export const naiveThemeOverrides = {
  common: {
    primaryColor: '#18a058',
    primaryColorHover: '#36ad6a',
    primaryColorPressed: '#0c7a43',
    primaryColorSuppl: '#36ad6a',

    // Info颜色相关
    infoColor: '#2080f0',
    infoColorHover: '#4098fc',
    infoColorPressed: '#1060c9',
    infoColorSuppl: '#4098fc',

    // Success颜色相关
    successColor: '#18a058',
    successColorHover: '#36ad6a',
    successColorPressed: '#0c7a43',
    successColorSuppl: '#36ad6a',

    // Warning颜色相关
    warningColor: '#f0a020',
    warningColorHover: '#fcb040',
    warningColorPressed: '#c97c10',
    warningColorSuppl: '#fcb040',

    // Error颜色相关
    errorColor: '#d03050',
    errorColorHover: '#de576d',
    errorColorPressed: '#ab1f3f',
    errorColorSuppl: '#de576d',
  },
};
// 亮色模式下的主题变量
export const lightThemeOverrides = {
  common: {
    borderColor: '#eee',
    tabSelectedBg: '#f0f0f4',
  },
};
// 黑暗模式下的主题变量
export const darkThemeOverrides = {
  common: {
    borderColor: '#333', // 边框颜色
    tabSelectedBg: '#1A171C', // 选中的tab背景色
  },
};

export const basePermissions: any[] = [
  {
    id: 13,
    code: 'ExternalLink',
    name: '外链(可内嵌打开)',
    type: 'MENU',
    icon: 'mingcute:eyeglass-fill',
    order: 98,
    enable: true,
    show: true,
    pid: null,
    path: '/external-link',
  },
  {
    id: 14,
    code: 'ShowDocs',
    name: '项目文档',
    type: 'MENU',
    path: 'https://docs.isme.top',
    icon: 'mingcute:scissors-2-line',
    order: 1,
    enable: true,
    show: true,
    pid: 13,
  },
  {
    id: 15,
    code: 'ApiFoxDocs',
    name: '接口文档',
    type: 'MENU',
    path: 'https://apifox.com/apidoc',
    icon: 'mingcute:rows-4-fill',
    order: 2,
    enable: true,
    show: true,
    pid: 13,
  },
  {
    id: 16,
    code: 'NaiveUI',
    name: 'Naive UI',
    type: 'MENU',
    path: 'https://www.naiveui.com/zh-CN/os-theme',
    icon: 'mingcute:ad-rectangle-fill',
    order: 3,
    enable: true,
    show: true,
    pid: 13,
  },
  {
    id: 17,
    code: 'MyBlog',
    name: '博客-掘金',
    type: 'MENU',
    path: 'https://juejin.cn',
    icon: 'mdi:account-circle-outline',
    order: 4,
    enable: true,
    show: true,
    pid: 13,
  },
];

export const basePermissions1 = [
  {
    id: 13,
    code: 'ExternalLink',
    name: '外链(可内嵌打开)',
    type: 'MENU',
    icon: 'mingcute:eyeglass-fill',
    order: 98,
    enable: true,
    show: true,
    children: [
      {
        id: 14,
        code: 'ShowDocs',
        name: '项目文档',
        type: 'MENU',
        path: 'https://docs.isme.top/web/#/624306705/188522224',
        icon: 'mingcute:scissors-2-line',
        order: 1,
        enable: true,
        show: true,
        pid: 13,
      },
      {
        id: 15,
        code: 'ApiFoxDocs',
        name: '接口文档',
        type: 'MENU',
        path: 'https://apifox.com/apidoc/shared-ff4a4d32-c0d1-4caf-b0ee-6abc130f734a',
        icon: 'mingcute:rows-4-fill',
        iconMode: 'bg',
        order: 2,
        enable: true,
        show: true,
        pid: 13,
      },
      {
        id: 16,
        code: 'NaiveUI',
        name: 'Naive UI',
        type: 'MENU',
        path: 'https://www.naiveui.com/zh-CN/os-theme',
        icon: 'mingcute:ad-rectangle-fill',
        iconMode: 'bg',
        order: 3,
        enable: true,
        show: true,
        pid: 13,
      },
      {
        id: 17,
        code: 'MyBlog',
        name: '博客-掘金',
        type: 'MENU',
        path: 'https://juejin.cn/user/1961184475483255/posts',
        icon: 'mdi:account-circle-outline',
        order: 4,
        enable: true,
        show: true,
        pid: 13,
      },
    ],
  },
];
