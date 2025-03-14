<script lang="ts" setup name="AccountManagement">
import type { VbenFormProps } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';
import type { SystemAccountApi } from '#/api/system/account';
import type { SystemRoleApi } from '#/api/system/role';

import { onMounted, ref } from 'vue';

import { Page, useVbenModal } from '@vben/common-ui';

import {
  Button,
  Message,
  Popconfirm,
  Space,
  Switch,
} from '@arco-design/web-vue';
import { IconPlus } from '@arco-design/web-vue/es/icon';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  deleteAccountApi,
  getAccountListApi,
  saveAccountApi,
} from '#/api/system/account';
import { getRoleListApi } from '#/api/system/role';
import { AvailableStatusEnum } from '#/typings/common';

import AccountModalComp from './components/AccountModal.vue';
import ResetPasswordModalComp from './components/ResetPasswordModal.vue';
import { accountSearchFormSchema } from './schema';

const currentRecord = ref<Partial<SystemAccountApi.SystemAccount>>();

const roleList = ref<SystemRoleApi.SystemRole[]>([]);

const formOptions: VbenFormProps = {
  collapsed: false,
  wrapperClass: 'grid grid-cols-[300px_300px_240px_1fr] items-center gap-4',
  actionWrapperClass: 'flex justify-start col-start-4 col-end-5',
  actionButtonsReverse: true,
  schema: accountSearchFormSchema(),
  showCollapseButton: false,
  submitOnChange: false,
  submitOnEnter: true,
};

const gridOptions: VxeGridProps = {
  columns: [
    { type: 'seq', width: 60, title: '序号' },
    { field: 'name', title: '姓名' },
    { field: 'username', title: '用户名' },
    { field: 'phone', title: '手机号' },
    { field: 'role.name', title: '角色' },
    {
      field: 'status',
      title: '状态',
      slots: { default: 'status' },
    },
    {
      title: '操作',
      fixed: 'right',
      slots: { default: 'action' },
    },
  ],
  rowConfig: {
    isHover: true,
    height: 80,
  },
  toolbarConfig: {
    refresh: false,
    zoom: true,
    custom: true,
  },
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues: any) => {
        return await getAccountListApi({
          page: page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        });
      },
    },
  },
};

const [Grid, gridApi] = useVbenVxeGrid({
  gridOptions,
  formOptions,
});

const [AccountModal, modalApi] = useVbenModal({
  connectedComponent: AccountModalComp,
  onConfirm: () => {
    gridApi.reload();
  },
});

const [ResetPasswordModal, resetPasswordModalApi] = useVbenModal({
  connectedComponent: ResetPasswordModalComp,
  onConfirm: () => {
    gridApi.reload();
  },
});

const handleAdd = () => {
  currentRecord.value = {};
  modalApi
    .setState({
      title: '新增账户',
    })
    .setData({})
    .open();
};

const handleEdit = (record: SystemAccountApi.SystemAccount) => {
  currentRecord.value = { ...record };
  modalApi
    .setState({
      title: '编辑账户',
    })
    .setData(record)
    .open();
};

const handleResetPassword = (record: SystemAccountApi.SystemAccount) => {
  resetPasswordModalApi
    .setState({
      title: '重置密码',
    })
    .setData(record)
    .open();
};

const handleDelete = async (record: SystemAccountApi.SystemAccount) => {
  try {
    await deleteAccountApi(record.id);
    Message.success('删除成功');
    gridApi.reload();
  } catch (error) {
    console.error('删除失败', error);
  }
};

const handleStatusChange = async (
  record: SystemAccountApi.SystemAccount,
  status: AvailableStatusEnum,
) => {
  gridApi.setLoading(true);
  try {
    record.statusLoading = true;
    await saveAccountApi(
      {
        status,
      },
      record.id,
    );
    Message.success('状态更新成功');
  } catch {
    record.status =
      status === AvailableStatusEnum.Normal
        ? AvailableStatusEnum.Forbidden
        : AvailableStatusEnum.Normal;
  } finally {
    record.statusLoading = false;
    gridApi.setLoading(false);
  }
};

const loadRoleList = async () => {
  const res = await getRoleListApi({ isAll: true });
  roleList.value = res.items;
  gridApi.formApi.updateSchema([
    {
      fieldName: 'roleId',
      componentProps: {
        options: roleList.value,
      },
    },
  ]);
};

onMounted(() => {
  gridApi.reload();
  loadRoleList();
});
</script>

<template>
  <Page auto-content-height>
    <AccountModal :role-list="roleList" @success="gridApi.reload" />
    <ResetPasswordModal @success="gridApi.reload" />

    <Grid class="h-full">
      <template #status="{ row }">
        <Switch
          :loading="row.statusLoading"
          :checked-value="AvailableStatusEnum.Normal"
          :unchecked-value="AvailableStatusEnum.Forbidden"
          v-model="row.status"
          @change="
            (value) => handleStatusChange(row, value as AvailableStatusEnum)
          "
        />
      </template>

      <template #action="{ row }">
        <Button type="text" size="small" @click="handleEdit(row)">
          编辑
        </Button>
        <Button type="text" size="small" @click="handleResetPassword(row)">
          重置密码
        </Button>

        <Popconfirm content="确定删除该账户吗？" @ok="handleDelete(row)">
          <Button type="text" size="small" status="danger"> 删除 </Button>
        </Popconfirm>
      </template>

      <template #toolbar-tools>
        <Space>
          <Button type="primary" @click="handleAdd">
            <template #icon>
              <IconPlus />
            </template>
            新增
          </Button>
        </Space>
      </template>
    </Grid>
  </Page>
</template>

<style scoped lang="less">
.container {
  padding: 0 20px 20px;
}
</style>
