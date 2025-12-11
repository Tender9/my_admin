<template>
   <div>当前路径：{{ $route.path }}</div>
   <div>当前路由名称：{{ $route.name }}</div>
   <div>当前参数：{{ $route.params }}</div>
   <a-config-provider
      :theme="{
         algorithm: theme.darkAlgorithm,
      }">
      <router-view></router-view>
   </a-config-provider>
</template>

<script setup lang="ts">
   import { theme } from "ant-design-vue";
</script>
