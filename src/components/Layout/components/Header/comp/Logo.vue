<template>
   <div>
      <img :src="site" alt="err" srcset="" />
   </div>
</template>

<script setup>
   import site from "@/assets/site.gif";
   import { ref, reactive, computed, watch, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted, onErrorCaptured } from "vue";
</script>

<style scoped>
   img {
      background-color: antiquewhite;
   }
</style>
