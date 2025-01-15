<script lang="ts" setup>
import { ConfigProvider } from '@arco-design/web-vue';

import { useLocale, useTheme } from '#/hooks';

defineOptions({ name: 'App' });

const { currentLocale } = useLocale();
const { theme } = useTheme();
</script>

<template>
  <ConfigProvider :locale="currentLocale" :theme="theme">
    <RouterView />
  </ConfigProvider>
</template>
