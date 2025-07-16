<script lang="ts" setup>
import type { ButtonGroupProps } from '../types/button-group'

import { BUTTON_GROUP_CTX_KEY } from '../contants'
import { provide } from 'vue'
defineOptions({
  name: 'TiButtonGroup',
})

const props = defineProps<ButtonGroupProps>()

provide(BUTTON_GROUP_CTX_KEY, props)
</script>

<template>
  <div class="ti-button-group">
    <slot></slot>
  </div>
</template>
