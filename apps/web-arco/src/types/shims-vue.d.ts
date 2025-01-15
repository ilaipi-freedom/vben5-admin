declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// 为其他模块添加类型声明
declare module '@vben/access';
declare module '@vben/common-ui';
declare module '@vben/preferences';
declare module '@vben/stores'; 
