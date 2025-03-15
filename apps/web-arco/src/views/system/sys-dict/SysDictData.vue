<script lang="ts" setup>
import type {
  OnActionClickParams,
  VxeTableGridOptions,
} from '#/adapter/vxe-table';
import type { SystemDictApi } from '#/api/system/sys-dict';
import type { SystemDictDataApi } from '#/api/system/sys-dict/data';

import { watch } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { Alert, Button, Input, Tooltip } from '@arco-design/web-vue';
import {
  IconPlus,
  IconQuestionCircle,
  IconRefresh,
} from '@arco-design/web-vue/es/icon';

import { message } from '#/adapter/arco';
import { useVbenForm } from '#/adapter/form';
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  deleteSysDictDataApi,
  getSysDictDataListApi,
} from '#/api/system/sys-dict/data';
import { $t } from '#/locales';

import DictDataModalComp from './components/DictDataModal.vue';
import { useSysDictDataListColumns } from './data';

const props = defineProps<{
  selectedDict?: SystemDictApi.SystemDict;
}>();

const [SearchForm, searchFormApi] = useVbenForm({
  schema: [
    {
      component: 'Input',
      fieldName: 'q',
    },
  ],
  showDefaultActions: false,
  submitOnEnter: true,
  commonConfig: {
    formItemClass: 'pb-0',
    hideLabel: true,
  },
  handleSubmit: refreshGrid,
});

const [DictDataModal, modalApi] = useVbenModal({
  connectedComponent: DictDataModalComp,
});

const [Grid, gridApi] = useVbenVxeGrid({
  gridOptions: {
    columns: useSysDictDataListColumns(handleActionClick),
    height: 'auto',
    keepSource: true,
    rowClassName: 'h-[60px]',
    proxyConfig: {
      ajax: {
        query: async ({ page }) => {
          const searchFormValues = await searchFormApi.getValues();
          return await getSysDictDataListApi({
            page: page.currentPage,
            pageSize: page.pageSize,
            ...searchFormValues,
            ...(props.selectedDict?.id
              ? { type: props.selectedDict.type }
              : {}),
          });
        },
      },
    },
    rowConfig: {
      keyField: 'id',
      isCurrent: true,
      isHover: true,
    },
    pagerConfig: {
      pageSize: 20,
      layouts: ['PrevPage', 'Number', 'NextPage'],
      autoHidden: true,
    },
    toolbarConfig: {
      custom: true,
      export: false,
      refresh: { code: 'query' },
      search: false,
      zoom: false,
    },
  } as VxeTableGridOptions<SystemDictDataApi.SystemDictData>,
});

const handleAdd = () => {
  modalApi
    .setData({
      sysDict: props.selectedDict,
    })
    .open();
};

watch(
  () => props.selectedDict?.id,
  (id) => {
    if (id) {
      gridApi.reload();
    }
  },
);

function refreshGrid() {
  gridApi.reload();
}

async function handleActionClick(
  params: OnActionClickParams<SystemDictDataApi.SystemDictData>,
) {
  switch (params.code) {
    case 'delete': {
      await deleteSysDictDataApi(params.row.id);
      message.success($t('ui.actionMessage.deleteSuccess', [params.row.label]));
      refreshGrid();
      break;
    }
    case 'edit': {
      modalApi
        .setData({
          row: params.row,
        })
        .open();
      break;
    }
  }
}
</script>
<template>
  <div>
    <Grid>
      <template #toolbar-actions>
        <div class="flex gap-2">
          <SearchForm>
            <template #q="slotProps">
              <Input
                v-bind="slotProps"
                :placeholder="$t('ui.placeholder.input')"
              >
                <template #prefix>
                  <Tooltip>
                    <template #content>
                      <div>
                        <p>模糊匹配：标签、键、值</p>
                        <p>回车搜索</p>
                      </div>
                    </template>
                    <IconQuestionCircle class="cursor-pointer" />
                  </Tooltip>
                </template>
              </Input>
            </template>
          </SearchForm>
          <Button
            type="secondary"
            @click="
              () => {
                searchFormApi.resetForm();
                refreshGrid();
              }
            "
            status="normal"
          >
            <template #icon>
              <IconRefresh />
            </template>
            {{ $t('common.reset') }}
          </Button>
        </div>
      </template>
      <template #toolbar-tools>
        <Button type="primary" @click="handleAdd" :disabled="!selectedDict?.id">
          <template #icon>
            <IconPlus />
          </template>
          {{ $t('ui.actionTitle.create') }}
        </Button>
      </template>
      <template #label="{ row }">
        <Alert
          :show-icon="false"
          :title="row.label"
          class="custom-alert"
          type="normal"
        >
          {{ row.key }}
        </Alert>
      </template>
    </Grid>
    <DictDataModal @success="refreshGrid" />
  </div>
</template>

<style lang="scss" scoped>
:deep(.custom-alert) {
  @apply p-0 px-[5px];

  .arco-alert-title {
    @apply mb-[-6px];
  }
}
</style>
