<script setup lang="ts">
import { onMounted, ref } from 'vue'

const count = ref(0)

const handleClick = () => {
  count.value++
  console.log(count.value)
}

const icon = ref('user')

const color = ref('red')

const text = ref()

onMounted(() => {
  setTimeout(() => {
    color.value = color.value === 'red' ? 'blue' : 'red'
    icon.value = icon.value === 'user' ? 'user-pen' : 'user'
    text.value = '1asfa11'
  }, 1000)
})
</script>

<template>
  <ti-button type="primary" size="small" use-throttle :throttle-duration="1000" @click="handleClick"
    >Click me</ti-button
  >
  <ti-button type="success" size="small" icon="search">{{ text }}</ti-button>
  <ti-button plain icon="search">Click me</ti-button>
  <ti-button-group size="large">
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
