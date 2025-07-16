# Button 按钮

常用操作按钮

## 基础用法

基础的函数用法

使用`size`、`color`、`pain`、`round`属性来定义 Button 的样式。
:::demo

```vue
<template>
  <div style="margin-bottom:20px;">
    <ti-button type="primary">主要按钮</ti-button>
    <TiButton type="success">绿色按钮</TiButton>
    <TiButton type="info">灰色按钮</TiButton>
    <TiButton type="warning">黄色按钮</TiButton>
    <TiButton type="danger">红色按钮</TiButton>
  </div>
  <div style="margin-bottom:20px;">
    <TiButton type="primary" plain>朴素按钮</TiButton>
    <TiButton type="success" plain>绿色按钮</TiButton>
    <TiButton type="info" plain>灰色按钮</TiButton>
    <TiButton type="warning" plain>黄色按钮</TiButton>
    <TiButton type="danger" plain>红色按钮</TiButton>
  </div>
  <div style="margin-bottom:20px;">
    <TiButton size="small" plain>小按钮</TiButton>
    <TiButton size="default" plain>中按钮</TiButton>
    <TiButton size="large" plain>大按钮</TiButton>
  </div>
  <div style="margin-bottom:20px;">
    <TiButton type="primary" round plain icon="search">搜索按钮</TiButton>
    <TiButton type="success" round plain icon="edit">编辑按钮</TiButton>
    <TiButton type="info" round plain icon="check">成功按钮</TiButton>
    <TiButton type="warning" round plain icon="message">提示按钮</TiButton>
    <TiButton type="danger" round plain icon="trash">删除按钮</TiButton>
  </div>
  <div style="margin-bottom:20px;">
    <TiButton type="primary" round plain icon="search"></TiButton>
    <TiButton type="success" round plain icon="edit"></TiButton>
    <TiButton type="info" round plain icon="check"></TiButton>
    <TiButton type="warning" round plain icon="message"></TiButton>
    <TiButton type="danger" round plain icon="trash"></TiButton>
  </div>
</template>
```

:::

## 图标按钮

带图标的按钮可增强辨识度（有文字）或节省空间（无文字）。

设置 icon 属性即可，icon 的列表可以参考 Element 的 icon 组件，也可以设置在文字右边的 icon ，只要使用 i 标签即可，可以使用自定义图标。
:::demo

```vue
<template>
  <div class="flex flex-row">
    <TiButton icon="edit" plain></TiButton>
    <TiButton icon="trash" plain></TiButton>
    <TiButton icon="share" plain></TiButton>
    <TiButton round plain icon="search">搜索</TiButton>
  </div>
</template>
```
