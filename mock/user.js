// user-api.js
export default [
   // login
   {
      url: "/api/login",
      method: "post",
      response: (req) => {
         const { username, password } = req.body;

         const userKey = username + " " + password;

         const userMappting = {
            // 管理员账号
            "root 123456": "admin-token",
            // 经理账号
            "editor 123456": "editor-token",
            // 分析师账号
            "analyst 123456": "analyst-token",
            // 操作员账号
            "operator 123456": "operator-token",
         };

         if (userMappting[userKey]) {
            return {
               code: 200,
               success: true,
               message: "登录成功",
               data: {
                  token: userMappting[userKey],
               },
            };
         } else {
            return {
               code: 401,
               success: false,
               message: "用户名或密码错误",
            };
         }
      },
   },
   // getUserInfo (包含用户信息、权限和菜单路由)
   {
      url: "/api/getUserInfo",
      method: "get",
      response: (req) => {
         const { authorization: token } = req.headers;
         if (!token) {
            return {
               code: 403,
               success: false,
               message: "无权限访问",
            };
         } else {
            // 菜单路由配置 (按角色区分权限)
            const adminMenus = [
               // 一级菜单：仪表盘
               {
                  id: 1,
                  parentId: 0, // 0表示一级菜单
                  path: "/dashboard",
                  name: "Dashboard",
                  meta: { title: "仪表盘", icon: "dashboard", keepAlive: true },
                  component: "dashboard/index",
                  level: 1, // 明确层级
               },

               // 一级菜单：系统管理
               {
                  id: 2,
                  parentId: 0,
                  path: "/system",
                  name: "System",
                  meta: { title: "系统管理", icon: "setting", keepAlive: false },
                  component: "Layout",
                  level: 1,
               },
               // 二级菜单：用户管理（父级为系统管理）
               {
                  id: 21,
                  parentId: 2,
                  path: "user",
                  name: "UserManage",
                  meta: { title: "用户管理", icon: "user", keepAlive: true },
                  component: "system/user/index",
                  level: 2,
               },
               // 三级菜单：用户详情（父级为用户管理）
               {
                  id: 211,
                  parentId: 21,
                  path: "user/detail",
                  name: "UserDetail",
                  meta: { title: "用户详情", icon: "user-detail", keepAlive: false },
                  component: "system/user/detail",
                  level: 3,
               },
               // 二级菜单：角色管理
               {
                  id: 22,
                  parentId: 2,
                  path: "role",
                  name: "RoleManage",
                  meta: { title: "角色管理", icon: "role", keepAlive: true },
                  component: "system/role/index",
                  level: 2,
               },
               // 二级菜单：菜单管理
               {
                  id: 23,
                  parentId: 2,
                  path: "menu",
                  name: "MenuManage",
                  meta: { title: "菜单管理", icon: "menu", keepAlive: true },
                  component: "system/menu/index",
                  level: 2,
               },
               // 二级菜单：日志管理
               {
                  id: 24,
                  parentId: 2,
                  path: "log",
                  name: "LogManage",
                  meta: { title: "日志管理", icon: "log", keepAlive: true },
                  component: "system/log/index",
                  level: 2,
               },

               // 一级菜单：内容管理
               {
                  id: 3,
                  parentId: 0,
                  path: "/content",
                  name: "Content",
                  meta: { title: "内容管理", icon: "content", keepAlive: false },
                  component: "Layout",
                  level: 1,
               },
               // 二级菜单：文章管理
               {
                  id: 31,
                  parentId: 3,
                  path: "article",
                  name: "ArticleManage",
                  meta: { title: "文章管理", icon: "article", keepAlive: true },
                  component: "content/article/index",
                  level: 2,
               },
               // 三级菜单：文章编辑
               {
                  id: 311,
                  parentId: 31,
                  path: "article/edit",
                  name: "ArticleEdit",
                  meta: { title: "文章编辑", icon: "edit", keepAlive: false },
                  component: "content/article/edit",
                  level: 3,
               },
               // 二级菜单：分类管理
               {
                  id: 32,
                  parentId: 3,
                  path: "category",
                  name: "CategoryManage",
                  meta: { title: "分类管理", icon: "category", keepAlive: true },
                  component: "content/category/index",
                  level: 2,
               },

               // 一级菜单：数据中心
               {
                  id: 4,
                  parentId: 0,
                  path: "/data",
                  name: "Data",
                  meta: { title: "数据中心", icon: "database", keepAlive: false },
                  component: "Layout",
                  level: 1,
               },
               // 二级菜单：数据分析
               {
                  id: 41,
                  parentId: 4,
                  path: "analysis",
                  name: "DataAnalysis",
                  meta: { title: "数据分析", icon: "analysis", keepAlive: true },
                  component: "data/analysis/index",
                  level: 2,
               },
               // 二级菜单：数据导出
               {
                  id: 42,
                  parentId: 4,
                  path: "export",
                  name: "DataExport",
                  meta: { title: "数据导出", icon: "export", keepAlive: true },
                  component: "data/export/index",
                  level: 2,
               },
            ];

            // 经理菜单 (比管理员少系统管理)
            const editorMenus = adminMenus.filter((item) => item.name !== "System");

            // 分析师菜单 (只有数据相关)
            const analystMenus = [
               {
                  path: "/dashboard",
                  name: "Dashboard",
                  meta: { title: "仪表盘", icon: "dashboard", keepAlive: true },
                  component: "Layout",
                  children: [
                     {
                        path: "index",
                        name: "DashboardIndex",
                        meta: { title: "数据概览", icon: "chart", keepAlive: true },
                        component: "dashboard/index",
                     },
                  ],
               },
               {
                  path: "/data",
                  name: "Data",
                  meta: { title: "数据中心", icon: "database", keepAlive: false },
                  component: "Layout",
                  children: [
                     {
                        path: "analysis",
                        name: "DataAnalysis",
                        meta: { title: "数据分析", icon: "analysis", keepAlive: true },
                        component: "data/analysis/index",
                     },
                     {
                        path: "export",
                        name: "DataExport",
                        meta: { title: "数据导出", icon: "export", keepAlive: true },
                        component: "data/export/index",
                     },
                  ],
               },
            ];

            // 操作员菜单 (只有基础查看权限)
            const operatorMenus = [
               {
                  path: "/dashboard",
                  name: "Dashboard",
                  meta: { title: "仪表盘", icon: "dashboard", keepAlive: true },
                  component: "Layout",
                  children: [
                     {
                        path: "index",
                        name: "DashboardIndex",
                        meta: { title: "数据概览", icon: "chart", keepAlive: true },
                        component: "dashboard/index",
                     },
                  ],
               },
               {
                  path: "/content",
                  name: "Content",
                  meta: { title: "内容管理", icon: "content", keepAlive: false },
                  component: "Layout",
                  children: [
                     {
                        path: "article",
                        name: "ArticleManage",
                        meta: { title: "文章查看", icon: "article", keepAlive: true },
                        component: "content/article/index",
                     },
                  ],
               },
            ];

            // 用户信息配置
            const userInfos = {
               "admin-token": {
                  id: 1,
                  name: "管理员",
                  role: "admin",
                  avatar: "https://picsum.photos/id/1/200",
                  email: "admin@example.com",
                  phone: "13800138000",
                  dept: "技术部",
                  post: "系统管理员",
                  lastLoginTime: "2025-10-22 08:30:00",
                  permissions: ["add", "edit", "delete", "export", "view", "config", "clear"],
                  menus: adminMenus,
               },
               "editor-token": {
                  id: 2,
                  name: "张经理",
                  role: "editor",
                  avatar: "https://picsum.photos/id/2/200",
                  email: "editor@example.com",
                  phone: "13800138001",
                  dept: "运营部",
                  post: "部门经理",
                  lastLoginTime: "2025-10-21 17:45:00",
                  permissions: ["add", "edit", "view"],
                  menus: editorMenus,
               },
               "analyst-token": {
                  id: 3,
                  name: "李分析",
                  role: "analyst",
                  avatar: "https://picsum.photos/id/3/200",
                  email: "analyst@example.com",
                  phone: "13800138002",
                  dept: "数据部",
                  post: "数据分析师",
                  lastLoginTime: "2025-10-22 09:10:00",
                  permissions: ["view", "export"],
                  menus: analystMenus,
               },
               "operator-token": {
                  id: 4,
                  name: "王操作",
                  role: "operator",
                  avatar: "https://picsum.photos/id/4/200",
                  email: "operator@example.com",
                  phone: "13800138003",
                  dept: "生产部",
                  post: "操作员",
                  lastLoginTime: "2025-10-22 10:20:00",
                  permissions: ["view"],
                  menus: operatorMenus,
               },
            };

            const userInfo = userInfos[token];

            if (userInfo) {
               return {
                  code: 200,
                  success: true,
                  message: "获取用户信息成功",
                  data: userInfo,
               };
            } else {
               return {
                  code: 403,
                  success: false,
                  message: "无权限！",
               };
            }
         }
      },
   },
];
