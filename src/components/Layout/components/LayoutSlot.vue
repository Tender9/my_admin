<template>
   <div class="page">
      <div class="layout-style-1" v-if="isVertical">
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

      <div class="layout-style-2" v-else>
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

   const isVertical = ref(true);

</script>

<style lang="scss" scoped>
   $top-height: 32px; // 顶部区域高度
   $status-height: 32px; // 底部状态栏

   .page {
      width: 100%;
      height: 100dvh;
      max-width: 100vw;
      max-height: 100dvh;
      overflow: hidden;
      box-sizing: border-box;
      padding: 20px;
   }

   .layout-style-1 {
         height: 100%;
         display: flex;
         flex-direction: column;
         overflow: hidden;

         .layout-top {
            height: $top-height;
            background-color: #3b82f6;
            color: white;
            box-sizing: border-box;
         }

         .layout-bottom {
            flex: 1;
            display: flex;
            height: calc(100% - $top-height);
            box-sizing: border-box;

            .sidebar {
               width: auto;
               box-sizing: border-box;
               height: 100%;
            }

            .content {
               flex: 1; /* 占据剩余空间 */
               height: 100%;
               background-color: #f3f4f6; /* 浅灰色 */
               box-sizing: border-box;
            }
         }
      }
      .layout-style-2{
         height: 100%;
         display: flex;
         flex-direction: column;
         overflow: hidden;
         .layout-top{
            display: none;
         }
         .layout-bottom{}
         .sidebar{}
         .content{

         }
      }
</style>
