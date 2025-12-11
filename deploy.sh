#!/usr/bin/env sh

set -e

echo "===== 提交源代码 ====="
git add .
# 检查是否有 staged 变更
if ! git diff --cached --quiet; then
  git commit -m "update"
  git push -f https://github.com/Tender9/my_admin.git master
else
  echo "无源代码变更，跳过提交"
fi

echo "===== 开始构建项目 ====="
npm run build

echo "===== 部署构建结果 ====="
cd dist

# 初始化新仓库并推送到 root-pages 分支
git init
git remote add origin https://github.com/Tender9/my_admin.git
git add -A
git -c user.name="Tender9" -c user.email="1505113506@qq.com" commit -m 'update'
git push -f origin master:root-pages || { echo "推送dist失败，终止执行"; exit 1; }

cd - > /dev/null

echo "===== 清理临时文件 ====="
rm -rf dist

echo "===== 所有操作完成 ====="


# 项目地址 https://tender9.github.io/my_admin/