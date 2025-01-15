<script lang="ts" setup>
import { Page } from '@vben/common-ui';

import {
  Button,
  Card,
  Message,
  Notification,
  Space,
} from '@arco-design/web-vue';

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
  Notification[type]({
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
    <Card class="mb-5" title="按钮">
      <Space>
        <Button>Default</Button>
        <Button type="secondary">Secondary</Button>
        <Button type="primary">Primary</Button>
        <Button type="outline">Info</Button>
        <Button status="success">Success</Button>
        <Button status="warning">Warning</Button>
        <Button status="danger">Error</Button>
      </Space>
    </Card>

    <Card class="mb-5" title="Message">
      <Space>
        <Button status="danger" @click="error">错误</Button>
        <Button status="warning" @click="warning">警告</Button>
        <Button status="success" @click="success">成功</Button>
        <Button type="primary" @click="loading">加载中</Button>
      </Space>
    </Card>

    <Card class="mb-5" title="Notification">
      <Space>
        <Button status="danger" @click="notify('error')">错误</Button>
        <Button status="warning" @click="notify('warning')">警告</Button>
        <Button status="success" @click="notify('success')">成功</Button>
        <Button type="primary" @click="notify('info')">加载中</Button>
      </Space>
    </Card>
  </Page>
</template>
