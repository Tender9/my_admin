<template>
   <!-- <div>11111111</div> -->
   <div>
      <Layout>
         <template #content>内容如下</template>
      </Layout>
   </div>
</template>

<script setup>
   import { ref, reactive, computed, watch, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted, onErrorCaptured } from "vue";
   import Layout from "@/components/Layout/index.vue";
   import { useUserStore } from "@/stores";
   import { useRouter } from "vue-router";

   let router = useRouter()
   const userStore = useUserStore();

   const user = {
      username: "root",
      password: "123456",
   };

   const login = async () => await userStore.userLogin(user)
 
   login()


</script>

<style scoped></style>
