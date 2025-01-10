import { $t } from '@/locales/i18n';
import { MENU_TYPE, NOTICE_TYPE } from '@/utils';

/** @description: 菜单类型 */
export const MenuTypeOptions = computed(() => [
  { label: $t('modules.system.menu.typeMap.directory'), value: MENU_TYPE.DIRECTORY },
  { label: $t('modules.system.menu.typeMap.menu'), value: MENU_TYPE.MENU },
  { label: $t('modules.system.menu.typeMap.button'), value: MENU_TYPE.BUTTON },
]);

/** @description: 页面布局 */
export const layoutOptions = computed(() => [
  { label: $t('layout.normal'), value: 'normal' },
  { label: $t('layout.fullContent'), value: 'full-content' },
  // { label: $t('layout.normalWithOutCard'), value: 'normal-without-card' },
]);

/** @description: 菜单类型主题 */
export const MenuTypeColorMap: Record<string, 'success' | 'warning' | 'info'> = {
  [MENU_TYPE.DIRECTORY]: 'success',
  [MENU_TYPE.MENU]: 'warning',
  [MENU_TYPE.BUTTON]: 'info',
};

/** @description: 状态选项配置 */
export const statusOptions = computed(() => [
  { label: $t('user.status.enable'), value: 1 },
  { label: $t('user.status.disable'), value: 0 },
]);

/** @description: 公告类型主题 */
export const NoticeTypeColorMap: Record<string, 'success' | 'warning' | 'info'> = {
  [NOTICE_TYPE.INFO]: 'success',
  [NOTICE_TYPE.NOTICE]: 'info',
  [NOTICE_TYPE.ACTIVITY]: 'warning',
};

/** @description: 公告类型选项配置 */
export const NoticeTypeOptions = computed(() => [
  { label: $t('modules.notice.notice.typeMap.notice'), value: 'NOTICE' },
  { label: $t('modules.notice.notice.typeMap.info'), value: 'INFO' },
  { label: $t('modules.notice.notice.typeMap.activity'), value: 'ACTIVITY' },
]);

/** @description: 公告类型对照 */
export const NoticeType = computed((): Recordable => {
  return {
    NOTICE: $t('modules.notice.notice.typeMap.notice'),
    INFO: $t('modules.notice.notice.typeMap.info'),
    ACTIVITY: $t('modules.notice.notice.typeMap.activity'),
  };
});

/** @description: 公告状态配置 */
export const NoticeStatusOptions = computed(() => [
  { label: $t('modules.notice.notice.statusMap.enable'), value: 1 },
  { label: $t('modules.notice.notice.statusMap.disable'), value: 0 },
]);

/** @description: 全局状态样式配置 */
export const GlobalStatusOptions: Record<number, 'success' | 'error'> = {
  1: 'success',
  0: 'error',
};

/** @description: 性别选项配置 */
export const sexOptions = computed(() => [
  { label: $t('user.male'), value: 'MALE' },
  { label: $t('user.female'), value: 'FEMALE' },
  { label: $t('user.other'), value: 'OTHER' },
]);

/** @description: 角色类型选项配置 */
export const roleTypeOptions = computed(() => [
  { label: $t('user.roleType.admin'), value: 'admin' },
  // { label: $t('user.roleType.user'), value: 'user' },
  { label: $t('user.roleType.doctor'), value: 'doctor' },
  { label: $t('user.roleType.patient'), value: 'patient' },
]);

/** @description: 角色类型选项配置 */
export const roleTypeTypeOptions: { [key: string]: 'warning' | 'info' | 'success' } = {
  admin: 'warning',
  doctor: 'info',
  patient: 'success',
};
// -----------------------自定义配置--------------------------
/** @description: 排班日期配置 */
export const timePeriodOptions = computed(() => [
  { label: '上午', value: 'MORNING' },
  { label: '下午', value: 'AFTERNOON' },
  // { label: '全天', value: 'DAY' },
]);
/** @description: 排班日期样式配置 */
export const timePeriodTypeOptions: { [key: string]: 'warning' | 'info' | 'success' } = {
  MORNING: 'warning',
  AFTERNOON: 'info',
  // DAY: 'success',
};
/** @description: 排班日期配置 */
export const AppointmentStatusOptions = [
  { label: '未就诊', value: 'UNFINISHED' },
  { label: '已就诊', value: 'FINISHED' },
  { label: '已取消', value: 'CANCELED' },
  { label: '已叫号', value: 'CALLED' },
  { label: '已过期', value: 'EXPIRED' },
];
/** @description: 排班日期样式配置 */
export const AppointmentStatusTypeOptions: {
  [key: string]: 'warning' | 'info' | 'success' | 'primary' | 'error';
} = {
  UNFINISHED: 'info',
  FINISHED: 'success',
  CANCELED: 'warning',
  CALLED: 'primary',
  EXPIRED: 'error',
};
