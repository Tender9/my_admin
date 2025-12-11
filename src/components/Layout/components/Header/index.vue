<template>
   <div class="container">
      <Logo />
      <Setting />
   </div>
</template>

<script setup>
   import { ref, reactive, computed, watch, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted, onErrorCaptured } from "vue";
   import Logo from "./comp/Logo.vue";
   import Setting from "./comp/Setting.vue";
</script>

<style scoped>
   /* .container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;
   } */
</style>
