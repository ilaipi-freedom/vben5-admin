import { Message } from '@arco-design/web-vue';
import { useClipboard } from '@vueuse/core';

export function copyText(
  source: string,
  prompt: null | string = '已成功复制到剪切板!',
) {
  const { copy } = useClipboard({ legacy: true, source });

  copy(source);
  if (!prompt) return;
  Message.success(prompt);
}
