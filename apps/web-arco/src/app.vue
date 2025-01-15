<script lang="ts" setup>
import { ConfigProvider } from '@arco-design/web-vue';

import { useLocale } from '#/hooks';

defineOptions({ name: 'App' });

const { currentLocale } = useLocale();
</script>

<template>
  <ConfigProvider :locale="currentLocale">
    <RouterView />
  </ConfigProvider>
</template>
