<template>
   <div class="status">
      <div @click="toggleMenu">
         <MenuFoldOutlined v-if="collapsed" />
         <MenuUnfoldOutlined v-else />
      </div>
      <div class="sys-time">
         {{ sysTime }}
      </div>
   </div>
</template>

<script>
   import { useMenuStore } from "@/stores";
   import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons-vue";
   import { watch } from "vue";

   function formatDateTime() {
      const date = new Date();
      const options = {
         year: "numeric",
         month: "2-digit",
         day: "2-digit",
         hour: "2-digit",
         minute: "2-digit",
         second: "2-digit",
         hour12: false,
      };
      return new Intl.DateTimeFormat("zh-CN", options).format(date).replace(",", "");
   }

   export default {
      name: "StatusComponent",
      components: {
         MenuFoldOutlined,
         MenuUnfoldOutlined,
      },
      data() {
         return {
            sysTime: null,
            menuStore: null, // 缓存Store实例
            requestId: null, // 保存RAF的ID，用于清理
            lastSecond: -1, // 记录上一次的秒数，避免无效更新
         };
      },
      created() {
         // 初始化Store并缓存
         this.menuStore = useMenuStore();
         // 初始化状态
         this.collapsed = this.menuStore.collapsed;
         // 监听Store中collapsed的变化，实现实时同步
         this.unwatch = watch(
            () => this.menuStore.collapsed,
            (newVal) => {
               this.collapsed = newVal;
            }
         );
         // 启动时间更新
         this.updateTimeWithRAF();
      },

      methods: {
         toggleMenu() {
            // 复用缓存的Store实例
            this.menuStore.toggleCollapse();
         },
         updateTimeWithRAF() {
            const now = new Date();
            const currentSecond = now.getSeconds();
            // 仅当秒数变化时才更新，减少无效计算
            if (currentSecond !== this.lastSecond) {
               this.sysTime = formatDateTime();
               this.lastSecond = currentSecond;
            }
            // 保存RAF的ID，用于后续清理
            this.requestId = requestAnimationFrame(this.updateTimeWithRAF);
         },
      },
      unmounted() {
         // 清理RAF，防止内存泄漏
         if (this.requestId) {
            cancelAnimationFrame(this.requestId);
         }
         // 清理watch监听
         this.unwatch();
      },
   };
</script>

<style scoped>
   .status {
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 5px;

      .sys-time {
         margin-left: auto;
         font-size: 14px;
      }
   }
</style>
