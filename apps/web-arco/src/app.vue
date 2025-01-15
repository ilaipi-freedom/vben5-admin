<script lang="ts" setup>
import { watch } from 'vue';

import { preferences } from '@vben/preferences';

import { ConfigProvider } from '@arco-design/web-vue';

import { useLocale } from '#/hooks';

defineOptions({ name: 'App' });

const { currentLocale } = useLocale();

const setTheme = () => {
  if (preferences.theme.mode === 'dark') {
    document.body.setAttribute('arco-theme', 'dark');
  } else {
    document.body.removeAttribute('arco-theme');
  }
};
watch(
  () => preferences.theme.mode,
  () => {
    setTheme();
  },
);
setTheme();
</script>

<template>
  <ConfigProvider :locale="currentLocale">
    <RouterView />
  </ConfigProvider>
</template>
