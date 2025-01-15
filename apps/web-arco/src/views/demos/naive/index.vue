<script lang="ts" setup>
import { Page } from '@vben/common-ui';

import { Message } from '@arco-design/web-vue';

function error() {
  Message.error('Once upon a time you dressed so fine');
}

function warning() {
  Message.warning('How many roads must a man walk down');
}

function success() {
  Message.success('Cause you walked hand in hand With another man in my place');
}

function loading() {
  Message.loading(
    'If I were you, I will realize that I love you more than any other guy',
  );
}

function notify(type: 'error' | 'info' | 'success' | 'warning') {
  Message.notification({
    type,
    content: '说点啥呢',
    duration: 2500,
    closable: true,
    title: '想不出来',
  });
}
</script>

<template>
  <Page
    description="支持多语言，主题功能集成切换等"
    title="Arco Design组件使用演示"
  >
    <a-card class="mb-5" title="按钮">
      <a-space>
        <a-button>Default</a-button>
        <a-button type="secondary">Secondary</a-button>
        <a-button type="primary">Primary</a-button>
        <a-button type="outline">Info</a-button>
        <a-button status="success">Success</a-button>
        <a-button status="warning">Warning</a-button>
        <a-button status="danger">Error</a-button>
      </a-space>
    </a-card>

    <a-card class="mb-5" title="Message">
      <a-space>
        <a-button status="danger" @click="error">错误</a-button>
        <a-button status="warning" @click="warning">警告</a-button>
        <a-button status="success" @click="success">成功</a-button>
        <a-button type="primary" @click="loading">加载中</a-button>
      </a-space>
    </a-card>

    <a-card class="mb-5" title="Notification">
      <a-space>
        <a-button status="danger" @click="notify('error')">错误</a-button>
        <a-button status="warning" @click="notify('warning')">警告</a-button>
        <a-button status="success" @click="notify('success')">成功</a-button>
        <a-button type="primary" @click="notify('info')">加载中</a-button>
      </a-space>
    </a-card>
  </Page>
</template>
