<template>
   <LayoutSlot>
      <template #header>
         <Header />
      </template>
      <template #sidebar>
         <Sidebar />
      </template>
      <template #content>
         <Content />
      </template>
   </LayoutSlot>
</template>

<script setup lang="ts">
   import LayoutSlot from "./components/LayoutSlot.vue";
   import Header from "./components/Header/index.vue";
   import Sidebar from "./components/LeftMenu/index.vue";
   import Content from "./components/RightContent/index.vue";
</script>
