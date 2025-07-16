<script lang="ts" setup>
import { inject, useTemplateRef } from 'vue'
import type { ButtonProps, ButtonInstance, ButtonEmits } from '../types/button'
import { throttle } from 'lodash-es'
import TiIcon from '../../icon/src/icon.vue'
import { BUTTON_GROUP_CTX_KEY } from '../contants'

defineOptions({
  name: 'TiButton',
})

const props = withDefaults(defineProps<ButtonProps>(), {
  tag: 'button',
  nativeType: 'button',
  useThrottle: true,
  throttleDuration: 500,
})

const emits = defineEmits<ButtonEmits>()
const ref = useTemplateRef<HTMLButtonElement>('buttonRef')
const ctx = inject(BUTTON_GROUP_CTX_KEY, undefined)

const size = ctx?.size ?? props.size
const type = ctx?.type ?? props.type
const disabled = ctx?.disabled ?? props.disabled

const handleClick = (e: MouseEvent) => emits('click', e)
const handleClickThrottled = throttle(handleClick, props.throttleDuration, {
  trailing: false, // 仅在时延开始时执行一次函数
})

defineExpose(<ButtonInstance>{
  ref,
})
</script>

<template>
  <component
    :is="tag"
    ref="buttonRef"
    :autofocus="autofocus"
    class="ti-button"
    :type="tag === 'button' ? nativeType : undefined"
    :disabled="disabled || loading"
    :class="{
      [`ti-button--${type}`]: type,
      [`ti-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled,
      'is-loading': loading,
    }"
    @click="(e: MouseEvent) => (useThrottle ? handleClickThrottled(e) : handleClick(e))"
  >
    <ti-icon v-if="loading" :icon="loadingIcon ?? 'spinner'" spin />
    <ti-icon v-if="icon && !loading" :icon="icon" />
    <span><slot></slot></span>
  </component>
</template>
