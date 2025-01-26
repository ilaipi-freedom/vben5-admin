/**
 * 通用组件共同的使用的基础组件，原先放在 adapter/form 内部，限制了使用范围，这里提取出来，方便其他地方使用
 * 可用于 vben-form、vben-modal、vben-drawer 等组件使用,
 */

import type { Component, SetupContext } from 'vue';

import type { BaseFormComponentType } from '@vben/common-ui';

import { h } from 'vue';

import { ApiComponent, globalShareState, IconPicker } from '@vben/common-ui';
import { $t } from '@vben/locales';

import {
  Button as AButton,
  Checkbox as ACheckbox,
  CheckboxGroup as ACheckboxGroup,
  DatePicker as ADatePicker,
  Divider as ADivider,
  Input as AInput,
  InputNumber as AInputNumber,
  Radio as ARadio,
  RadioGroup as ARadioGroup,
  Select as ASelect,
  Space as ASpace,
  Switch as ASwitch,
  TimePicker as ATimePicker,
  TreeSelect as ATreeSelect,
  Upload as AUpload,
  Textarea,
} from '@arco-design/web-vue';

import { message } from '#/adapter/arco';

const withDefaultPlaceholder = <T extends Component>(
  component: T,
  type: 'input' | 'select',
) => {
  return (props: any, { attrs, slots }: Omit<SetupContext, 'expose'>) => {
    const placeholder = props?.placeholder || $t(`ui.placeholder.${type}`);
    return h(component, { ...props, ...attrs, placeholder }, slots);
  };
};

// 这里需要自行根据业务组件库进行适配，需要用到的组件都需要在这里类型说明
export type ComponentType =
  | 'ApiSelect'
  | 'ApiTreeSelect'
  | 'Checkbox'
  | 'CheckboxGroup'
  | 'DatePicker'
  | 'Divider'
  | 'IconPicker'
  | 'Input'
  | 'InputNumber'
  | 'RadioGroup'
  | 'Select'
  | 'Space'
  | 'Switch'
  | 'Textarea'
  | 'TimePicker'
  | 'TreeSelect'
  | 'Upload'
  | BaseFormComponentType;

async function initComponentAdapter() {
  const components: Partial<Record<ComponentType, Component>> = {
    // 如果你的组件体积比较大，可以使用异步加载
    // Button: () =>
    // import('xxx').then((res) => res.Button),

    ApiSelect: (props, { attrs, slots }) => {
      return h(
        ApiComponent,
        {
          placeholder: $t('ui.placeholder.select'),
          ...props,
          ...attrs,
          component: ASelect,
          modelPropName: 'modelValue',
        },
        slots,
      );
    },
    ApiTreeSelect: (props, { attrs, slots }) => {
      return h(
        ApiComponent,
        {
          placeholder: $t('ui.placeholder.select'),
          ...props,
          ...attrs,
          component: ATreeSelect,
          nodeKey: 'value',
          loadingSlot: 'loading',
          keyField: 'value',
          modelPropName: 'modelValue',
          optionsPropName: 'data',
          visibleEvent: 'dropdownVisibleChange',
        },
        slots,
      );
    },
    Checkbox: ACheckbox,
    CheckboxGroup: (props, { attrs, slots }) => {
      let defaultSlot;
      if (Reflect.has(slots, 'default')) {
        defaultSlot = slots.default;
      } else {
        const { options } = attrs;
        if (Array.isArray(options)) {
          defaultSlot = () => options.map((option) => h(ACheckbox, option));
        }
      }
      return h(
        ACheckboxGroup,
        { ...props, ...attrs },
        { default: defaultSlot },
      );
    },
    DatePicker: ADatePicker,
    // 自定义默认按钮
    DefaultButton: (props, { attrs, slots }) => {
      return h(AButton, { ...props, attrs }, slots);
    },
    // 自定义主要按钮
    PrimaryButton: (props, { attrs, slots }) => {
      return h(AButton, { ...props, attrs, type: 'primary' }, slots);
    },
    Divider: ADivider,
    IconPicker: (props, { attrs, slots }) => {
      return h(
        IconPicker,
        { iconSlot: 'suffix', inputComponent: AInput, ...props, ...attrs },
        slots,
      );
    },
    Input: withDefaultPlaceholder(AInput, 'input'),
    InputNumber: withDefaultPlaceholder(AInputNumber, 'input'),
    RadioGroup: (props, { attrs, slots }) => {
      let defaultSlot;
      if (Reflect.has(slots, 'default')) {
        defaultSlot = slots.default;
      } else {
        const { options } = attrs;
        if (Array.isArray(options)) {
          defaultSlot = () => options.map((option) => h(ARadio, option));
        }
      }
      const groupRender = h(
        ARadioGroup,
        { ...props, ...attrs },
        { default: defaultSlot },
      );
      return attrs.isButton
        ? h(ASpace, { direction: 'vertical' }, () => groupRender)
        : groupRender;
    },
    Select: withDefaultPlaceholder(ASelect, 'select'),
    Space: ASpace,
    Switch: ASwitch,
    TimePicker: ATimePicker,
    TreeSelect: withDefaultPlaceholder(ATreeSelect, 'select'),
    Upload: AUpload,
    Textarea,
  };

  // 将组件注册到全局共享状态中
  globalShareState.setComponents(components);

  // 定义全局共享状态中的消息提示
  globalShareState.defineMessage({
    // 复制成功消息提示
    copyPreferencesSuccess: (title: string, content?: string) => {
      message.success(content || title);
    },
  });
}

export { initComponentAdapter };
