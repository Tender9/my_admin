<template>
   <Menu />
</template>

<script setup>
   import { ref, reactive, computed, watch, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted, onErrorCaptured } from "vue";
   import Menu from "./comp/Menu.vue";
</script>

<style lang="scss" scoped>
   // .left-menu {
   //    width: fit-content;
   // }
</style>
