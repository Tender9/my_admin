<template>
   <div class="page">
      <div class="layout-style-1">
         <!-- 顶部区域 -->
         <div class="layout-top">
            <slot name="header"></slot>
         </div>

         <!-- 下方内容区域，占据剩余空间 -->
         <div class="layout-bottom">
            <!-- 左侧菜单栏 -->
            <div class="sidebar">
               <slot name="sidebar"></slot>
            </div>

            <!-- 右侧内容区 -->
            <div class="content">
               <slot name="content"></slot>
            </div>
         </div>
      </div>
   </div>
</template>

<script setup>
   import { ref, reactive, computed } from "vue";

   const isVertical = computed(() => {
      return true;
   });
</script>

<style lang="scss" scoped>
   $header-height: 64px + 20px; // 顶部区域高度

   .page {
      width: 100vw;
      height: 100vh;
      overflow: hidden;
      box-sizing: border-box;
      padding: 20px;

      .layout-style-1 {
         height: 100%;
         display: flex;
         flex-direction: column;
         overflow: hidden;

         .layout-top {
            height: 30px;
            background-color: #3b82f6;
            color: white;
            box-sizing: border-box;
         }

         .layout-bottom {
            flex: 1;
            display: flex;
            height: calc(100vh - $header-height);
            box-sizing: border-box;

            .sidebar {
               width: fit-content;
               background-color: #22c55e; /* 绿色 */
               color: white;
               box-sizing: border-box;
            }

            .content {
               flex: 1; /* 占据剩余空间 */
               background-color: #f3f4f6; /* 浅灰色 */
               overflow: hidden; /* 内容过多时可滚动 */
               box-sizing: border-box;
            }
         }
      }
   }
</style>
