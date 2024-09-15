import { defineConfig, presetUno, presetIcons, presetAttributify } from 'unocss';
import presetRemToPx from '@unocss/preset-rem-to-px';
// import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders';
// import { getIcons } from './build';

// const icons = getIcons();
export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1,
      warn: true,
      prefix: ['i-'],
      extraProperties: {
        display: 'inline-block',
      },
      // collections: {
      //   me: FileSystemIconLoader('./src/assets/icons/isme'),
      //   fe: FileSystemIconLoader('./src/assets/icons/feather'),
      // },
    }),
    presetRemToPx({ baseFontSize: 16 }),
  ],
  // safelist: icons.map((icon) => `${icon} ${icon}?mask`.split(' ')).flat(),
  shortcuts: {
    'wh-full': 'w-full h-full box-border',
    'flex-center': 'flex justify-center items-center',
    'flex-row': 'flex flex-row',
    'flex-col': 'flex flex-col',
    'flex-y-center': 'flex justify-center',
    'flex-x-center': 'flex items-center',
    'flex-x-end': 'flex items-end',
    'card-border': 'border border-solid border-light_border dark:border-dark_border',
    'auto-bg': 'bg-white dark:bg-#18181C',
  },
  rules: [
    [
      'card-shadow',
      { 'box-shadow': '0 1px 2px -2px #00000029, 0 3px 6px #0000001f, 0 5px 12px 4px #00000017' },
    ],
  ],
  theme: {
    colors: {
      primary: 'var(--primary-color)', // 主题色
      primary_hover: 'var(--primary-color-hover)', // 主题色hover
      primary_pressed: 'var(--primary-color-pressed)', // 主题色pressed
      primary_active: 'var(--primary-color-active)', // 主题色active
      info: 'var(--info-color)', // 信息色
      info_hover: 'var(--info-color-hover)', // 信息色hover
      info_pressed: 'var(--info-color-pressed)', // 信息色pressed
      info_active: 'var(--info-color-active)', // 信息色active
      success: 'var(--success-color)', // 成功色
      success_hover: 'var(--success-color-hover)', // 成功色hover
      success_pressed: 'var(--success-color-pressed)', // 成功色pressed
      success_active: 'var(--success-color-active)', // 成功色active
      warning: 'var(--warning-color)', // 警告色
      warning_hover: 'var(--warning-color-hover)', // 警告色hover
      warning_pressed: 'var(--warning-color-pressed)', // 警告色pressed
      warning_active: 'var(--warning-color-active)', // 警告色active
      error: 'var(--error-color)', // 错误色
      error_hover: 'var(--error-color-hover)', // 错误色hover
      error_pressed: 'var(--error-color-pressed)', // 错误色pressed
      error_active: 'var(--error-color-active)', // 错误色active
      light: '#fafafa', // 明亮模式
      dark: '#18181c', // 深色模式
      light_border: '#efeff5', // 明亮模式边框
      dark_border: '#2d2d30', // 深色模式边框
      tips: '#999999', // 提示颜色
    },
    fontSize: {
      sm: '0.8rem',
      base: '1rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
    },
    fontFamily: {
      global: ['Smiley Sans'],
      harmony: ['HarmonySans'],
    },
  },
});
