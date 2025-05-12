import type { SystemDictDataApi } from '#/api/system/sys-dict/data';

import { ref } from 'vue';

import { keyBy } from 'lodash-es';

import { getSysDictDataListApi } from '#/api/system/sys-dict/data';

type DictDataOptions = {
  key?: string;
  mapField?: string;
};

export default function useDictData(type: string, options?: DictDataOptions) {
  const list = ref<SystemDictDataApi.SystemDictData[]>([]);
  const map = ref<Record<string, SystemDictDataApi.SystemDictData>>({});
  // 用于明确知道只有一个的时候
  const dictData = ref<SystemDictDataApi.SystemDictData>();
  const fetch = async () => {
    const res = await getSysDictDataListApi({
      type,
      isAll: true,
      key: options?.key,
    });
    list.value = res.items;
    map.value = keyBy(res.items, options?.mapField || 'key');
  };
  fetch();
  return {
    list,
    map,
    dictData,
  };
}
