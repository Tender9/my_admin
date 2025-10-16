<template>
   <!-- <div>11111111</div> -->
   <div>
      <index>
         <template #content>内容如下</template>
      </index>
   </div>
</template>

<script setup>
   import { ref, reactive, computed, watch, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted, onErrorCaptured } from "vue";
   import { login } from "@/api/user";
   import index from "@/components/Layout/index.vue";
   const user = {
      username: "admin",
      password: "123456",
   };
   const headers = {
      postId: "admin",
   };
   login(user, headers).then((res) => {});
</script>

<style scoped></style>
