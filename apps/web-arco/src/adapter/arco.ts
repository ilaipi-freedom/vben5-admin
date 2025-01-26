import '@vben/styles';

import '@arco-design/web-vue/dist/arco.css';

// Arco Design Vue 会自动适应明暗主题，不需要单独配置主题对象
// 可以通过 configProvider 组件或 body 添加 arco-theme-dark 类名来切换主题

export {
  Modal as dialog,
  Message as message,
  Modal as modal,
  Notification as notification,
} from '@arco-design/web-vue';
