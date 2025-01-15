import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn';
import enUS from '@arco-design/web-vue/es/locale/lang/en-us';

export function useLocale() {
  const { locale } = useI18n();

  const currentLocale = computed(() => {
    switch (locale.value) {
      case 'zh-CN':
        return zhCN;
      case 'en-US':
        return enUS;
      default:
        return zhCN;
    }
  });

  return {
    currentLocale,
  };
} 
