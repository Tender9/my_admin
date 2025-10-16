#!/usr/bin/env sh

set -e  # 任何命令失败时立即退出脚本

echo "===== 提交源代码 ====="
git add .
git commit -m "update" || { echo "提交源代码失败，终止执行"; exit 1; }
git push -f https://github.com/Tender9/my_admin.git master || { echo "推送源代码失败，终止执行"; exit 1; }

echo "===== 开始构建项目 ====="
npm run build || { echo "构建失败，终止执行"; exit 1; }

echo "===== 部署构建结果 ====="
cd dist || { echo "进入dist目录失败，终止执行"; exit 1; }

git init
git add -A
git commit -m 'update' || { echo "提交dist失败，终止执行"; exit 1; }
git push -f https://github.com/Tender9/my_admin.git master:root-pages || { echo "推送dist失败，终止执行"; exit 1; }

cd - || exit 1

echo "===== 清理临时文件 ====="
rm -rf dist

echo "===== 所有操作完成 ====="
