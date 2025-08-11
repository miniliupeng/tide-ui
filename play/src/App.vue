<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { ButtonType } from '@tide-element/components/button/types/button'

const count = ref(0)

const handleClick = () => {
  count.value++
  console.log(count.value)
}

const icon = ref('user')

const color = ref('red')
const type = ref<ButtonType>('primary')

const text = ref()

onMounted(() => {
  setTimeout(() => {
    color.value = color.value === 'red' ? 'blue' : 'red'
    icon.value = icon.value === 'user' ? 'user-pen' : 'user'
    text.value = '1asfa11'
    type.value = type.value === 'primary' ? 'success' : 'primary'
  }, 1000)
})
</script>

<template>
  <ti-button type="primary" size="small" use-throttle :throttle-duration="1000" @click="handleClick"
    >Click me</ti-button
  >
  <ti-button type="success" size="small" icon="search">{{ text }}</ti-button>
  <ti-button plain icon="search">Click me</ti-button>
  <ti-button-group size="large" :type="type">
    <ti-button loading>Click me</ti-button>
    <ti-button disabled>Click me</ti-button>
  </ti-button-group>
  <ti-button circle>Click me</ti-button>
  <ti-button round>Click me</ti-button>
  <ti-button loading>Click me</ti-button>
  <ti-button disabled>Click me</ti-button>

  <ti-button type="primary" size="small" loading>Click me</ti-button>
  <ti-button type="success" size="small" loading>Click me</ti-button>

  <a>Click me</a>

  <ti-icon :icon="icon" type="primary" :color="color" />
</template>

<style scoped></style>
