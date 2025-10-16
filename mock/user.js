// user-api.js
export default [
   {
      url: "/api/login",
      method: "post",
      rawResponse: async (req, res) => {
         res.setHeader("Content-Type", "application/json");

         const body = await new Promise((resolve) => {
            let reqbody = "";
            req.on("data", (chunk) => {
               reqbody += chunk;
            });
            req.on("end", () => resolve(reqbody));
         });

         try {
            const parsedBody = JSON.parse(body);
            if (parsedBody.username && parsedBody.password) {
               const users = [
                  { id: 1, username: "admin", password: "123456", name: "管理员", roles: ["admin"] },
                  { id: 2, username: "user", password: "123456", name: "普通用户", roles: ["user"] },
               ];

               const user = users.find((u) => u.username === parsedBody.username && u.password === parsedBody.password);

               if (user) {
                  // 登录成功响应
                  res.end(
                     JSON.stringify({
                        code: 200,
                        success: true,
                        message: "登录成功",
                        data: {
                           token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
                           userInfo: {
                              id: user.id,
                              username: user.username,
                              nickname: user.name,
                              roles: user.roles,
                           },
                        },
                     })
                  );
               } else {
                  // 用户名或密码错误
                  res.end(
                     JSON.stringify({
                        code: 400,
                        success: false,
                        message: "用户名或密码错误",
                        data: null,
                     })
                  );
               }
            }
         } catch (error) {
            // 解析错误响应
            res.end(
               JSON.stringify({
                  code: 400,
                  success: false,
                  message: "请求体格式错误，应为JSON格式",
                  data: null,
               })
            );
         }
      },
   },
   {
      url: "/api/roles",
      method: "get",
      response: () => {
         return {
            code: 200,
            success: true,
            message: "获取角色成功",
            data: [
               { id: 1, name: "系统管理员", permissions: ["add", "edit", "delete", "export", "view", "config", "clear"] },
               { id: 2, name: "内容管理员", permissions: ["add", "edit", "view"] },
               { id: 3, name: "数据分析师", permissions: ["view", "export"] },
               { id: 4, name: "操作员", permissions: ["view"] },
            ],
         };
      },
   },
];
