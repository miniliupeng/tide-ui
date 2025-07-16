<script lang="ts" setup>
import type { IconProps } from '../types/icon'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { omit } from 'lodash-es'
import { computed } from 'vue'

defineOptions({
  name: 'TiIcon',
  inheritAttrs: false,
})

const props = defineProps<IconProps>()

const filterProps = computed(() => omit(props, ['type', 'color']))
</script>

<template>
  <i class="ti-icon" :class="`ti-icon--${type}`" v-bind="$attrs">
    <font-awesome-icon v-bind="filterProps" />
  </i>
</template>
