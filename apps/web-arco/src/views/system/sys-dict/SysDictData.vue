<script lang="ts" setup>
// 由于找不到ant-design-vue/es/tree模块，我们可以定义自己的DataNode接口
import type { Recordable } from '@vben/types';

import type { SystemRoleApi } from '#/api/system/role';

import { ref, watch } from 'vue';

import { VbenTree } from '@vben/common-ui';
import { IconifyIcon } from '@vben/icons';

import { Button, Card, Space } from '@arco-design/web-vue';

import { notification } from '#/adapter/arco';
import { useVbenForm } from '#/adapter/form';
import { getMenuTreeApi, SystemMenuApi } from '#/api/system/menu';
import { saveRolePermApi } from '#/api/system/role';

import { usePermissionFormSchema } from './data';

const props = defineProps<{
  checkedCodes?: string[];
  selectedRole?: SystemRoleApi.SystemRole;
}>();

const treeData = ref<SystemMenuApi.SystemMenu[]>([]);
const [Form, formApi] = useVbenForm({
  schema: usePermissionFormSchema(),
  showDefaultActions: false,
  commonConfig: {
    hideLabel: true,
  },
});

// 添加对VbenTree组件的引用
const treeRef = ref();

// 添加调用collapseAll方法的函数
const handleCollapseAll = () => {
  treeRef.value?.[0]?.collapseAll();
};

const handleExpandAll = () => {
  treeRef.value?.[0]?.expandAll();
};

const fetchMenuList = async () => {
  const list = await getMenuTreeApi();
  treeData.value = list;
};

fetchMenuList();

// 保存权限设置
const save = async () => {
  const { permissions } = await formApi.getValues();
  if (props.selectedRole?.id) {
    await saveRolePermApi(props.selectedRole.id, permissions);
    notification.success({
      title: '权限配置保存成功',
      content: '请提醒用户刷新后生效',
    });
  }
};

function getNodeClass(node: Recordable<any>) {
  const classes: string[] = [];
  if (node.value?.type === 'button') {
    classes.push('inline-flex');
    if (node.index % 3 >= 1) {
      classes.push('!pl-0');
    }
  }

  return classes.join(' ');
}

watch(
  () => props.selectedRole?.id,
  (id) => {
    if (id) {
      formApi.setValues({
        permissions: props.checkedCodes,
      });
    }
  },
);
</script>
<template>
  <Card>
    <template #extra>
      <Space>
        <Button @click="handleExpandAll"> 全展 </Button>
        <Button @click="handleCollapseAll"> 全收 </Button>
        <Button type="primary" @click="save" :disabled="!selectedRole?.id">
          保存设置
        </Button>
      </Space>
    </template>
    <template #title>
      <div class="flex items-center gap-2">
        <div class="text-lg font-bold">配置权限</div>
        <div class="text-lg font-bold" v-if="selectedRole?.id">
          ：{{ selectedRole?.name }}({{ selectedRole?.perm }})
        </div>
      </div>
    </template>
    <Form>
      <template #permissions="slotProps">
        <VbenTree
          ref="treeRef"
          :tree-data="treeData"
          :multiple="!!selectedRole?.id"
          :default-expanded-level="2"
          :get-node-class="getNodeClass"
          v-bind="slotProps"
          value-field="id"
          label-field="meta.title"
          icon-field="meta.icon"
        >
          <template #node="{ value }">
            <IconifyIcon v-if="value.meta.icon" :icon="value.meta.icon" />
            {{ $t(value.meta.title) }}
          </template>
        </VbenTree>
      </template>
    </Form>
  </Card>
</template>
