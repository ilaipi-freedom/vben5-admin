import { computed } from 'vue';
import { preferences } from '@vben/preferences';

export function useTheme() {
  const theme = computed(() => ({
    // Arco Design Vue 会自动适应明暗主题，不需要单独配置主题对象
    // 可以通过 body 添加 arco-theme-dark 类名来切换主题
  }));

  return {
    theme,
  };
} 
