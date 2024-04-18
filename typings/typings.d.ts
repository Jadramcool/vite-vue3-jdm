// 声明window上自定义属性，如事件总线
declare interface Window {
  eventBus: any;
  $loadingBar: import('naive-ui').LoadingBarApi;
  $dialog: import('naive-ui').DialogApi;
  $message: import('naive-ui').MessageApi;
  $notification: import('naive-ui').NotificationApi;
}

// 声明.vue文件
// declare module '*.vue' {
//   import { ComponentOptions } from 'vue';

//   const component: ComponentOptions;
//   export default component;
// }
