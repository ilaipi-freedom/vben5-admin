<script lang="ts" setup>
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { SystemDictApi } from '#/api/system/sys-dict';

import { useVbenModal } from '@vben/common-ui';

import {
  Alert,
  Button,
  Input,
  Popconfirm,
  Tooltip,
} from '@arco-design/web-vue';
import {
  IconDelete,
  IconEdit,
  IconPlus,
  IconQuestionCircle,
  IconRefresh,
} from '@arco-design/web-vue/es/icon';

import { message } from '#/adapter/arco';
import { useVbenForm } from '#/adapter/form';
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { deleteSysDictApi, getSysDictListApi } from '#/api/system/sys-dict';
import { $t } from '#/locales';

import DictModalComp from './components/DictModal.vue';
import { useSysDictListColumns } from './data';

defineOptions({ name: 'SysDictList' });

const emit = defineEmits(['select']);

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

const [Grid, gridApi] = useVbenVxeGrid({
  gridEvents: {
    currentChange: ({ row }: { row: SystemDictApi.SystemDict }) => {
      emit('select', row);
    },
  },
  showSearchForm: false,
  gridOptions: {
    columns: useSysDictListColumns(),
    height: 'auto',
    keepSource: true,
    formConfig: {
      enabled: false,
    },
    proxyConfig: {
      ajax: {
        query: async ({ page }) => {
          const searchFormValue = await searchFormApi.getValues();
          return await getSysDictListApi({
            page: page.currentPage,
            pageSize: page.pageSize,
            ...searchFormValue,
          });
        },
      },
    },
    showHeader: false,
    rowClassName: 'h-[60px] cursor-pointer',
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
      custom: false,
      export: false,
      refresh: { code: 'query' },
      search: false,
      zoom: false,
    },
  } as VxeTableGridOptions<SystemDictApi.SystemDict>,
});

const [DictModal, modalApi] = useVbenModal({
  connectedComponent: DictModalComp,
});

function handleAdd() {
  modalApi.open();
}

function handleEdit(row: SystemDictApi.SystemDict) {
  modalApi.setData({ row }).open();
}

async function handleDelete(row: SystemDictApi.SystemDict) {
  await deleteSysDictApi(row.id);
  gridApi.reload();
  message.success($t('ui.actionMessage.deleteSuccess', [row.name]));
}

function refreshGrid() {
  gridApi.reload();
}
</script>

<template>
  <div>
    <Grid>
      <template #name="{ row }">
        <Alert
          :type="
            row.id === gridApi?.grid?.getCurrentRecord()?.id ? 'info' : 'normal'
          "
          :show-icon="false"
          :title="row.name"
          class="custom-alert"
        >
          {{ row.type }}
        </Alert>
      </template>
      <template #action="{ row }">
        <Tooltip
          :content="
            $t('ui.actionTitle.edit', [$t('system.sysDict.type.title')])
          "
        >
          <Button type="text" @click="handleEdit(row)" size="mini">
            <IconEdit />
          </Button>
        </Tooltip>
        <Tooltip
          :content="
            $t('ui.actionTitle.delete', [$t('system.sysDict.type.title')])
          "
          position="bottom"
        >
          <Popconfirm
            :content="`${$t('ui.actionTitle.delete', [$t('system.sysDict.type.title')])}?`"
            @ok="handleDelete(row)"
          >
            <Button type="text" status="danger" size="mini">
              <IconDelete />
            </Button>
          </Popconfirm>
        </Tooltip>
      </template>
      <template #toolbar-actions>
        <div class="flex w-full">
          <SearchForm class="flex-1">
            <template #q="slotProps">
              <Input
                v-bind="slotProps"
                :placeholder="$t('ui.placeholder.input')"
              >
                <template #prefix>
                  <Tooltip>
                    <template #content>
                      <div>
                        <p>模糊匹配：标签、编码</p>
                        <p>回车搜索</p>
                      </div>
                    </template>
                    <IconQuestionCircle class="cursor-pointer" />
                  </Tooltip>
                </template>
                <template #suffix>
                  <Tooltip>
                    <template #content>
                      <div>重置</div>
                    </template>
                    <IconRefresh
                      class="cursor-pointer"
                      @click="
                        () => {
                          searchFormApi.resetForm();
                          refreshGrid();
                        }
                      "
                    />
                  </Tooltip>
                </template>
              </Input>
            </template>
          </SearchForm>
          <div class="flex w-[70px] justify-end">
            <Tooltip
              :content="
                $t('ui.actionTitle.create', [$t('system.sysDict.type.title')])
              "
            >
              <Button type="primary" @click="handleAdd">
                <template #icon>
                  <IconPlus />
                </template>
              </Button>
            </Tooltip>
          </div>
        </div>
      </template>
    </Grid>

    <DictModal @success="refreshGrid" />
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
