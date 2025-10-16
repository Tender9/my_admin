<template>
   <a-dropdown v-model:open="visible">
      <a class="ant-dropdown-link" @click.prevent style="margin-right: 20px">
         <UserOutlined />
      </a>
      <template #overlay>
         <a-menu @click="handleMenuClick">
            <a-menu-item key="1">Clicking me will not close the menu.</a-menu-item>
            <a-menu-item key="2">Clicking me will not close the menu also.</a-menu-item>
            <a-menu-item key="3">Clicking me will close the menu</a-menu-item>
         </a-menu>
      </template>
   </a-dropdown>
</template>
<script lang="ts" setup>
   import { ref } from "vue";
   import { UserOutlined } from "@ant-design/icons-vue";
   import type { MenuProps } from "ant-design-vue";
   const visible = ref(false);
   const handleMenuClick: MenuProps["onClick"] = (e) => {
      if (e.key === "3") {
         visible.value = false;
      }
   };
</script>
