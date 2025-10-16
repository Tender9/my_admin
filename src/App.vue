<template>
   <a-config-provider
      :theme="{
         algorithm: theme.darkAlgorithm,
      }">
      <router-view></router-view>
   </a-config-provider>
</template>

<script setup lang="ts">
   import { theme } from "ant-design-vue";
   import { login } from "./api/user";
   login({
      username: "admin",
      password: "123456",
   }).then(({ code, data }) => {
      console.log(code, data);
   });
</script>
