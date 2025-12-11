DIST_DIR="dist"
REPO_URL="https://github.com/Tender9/my_admin.git"
BRANCH="root-pages"

echo "===== 构建项目 dist ====="

npm run build

echo "🚀 准备部署 $DIST_DIR 到 $REPO_URL ($BRANCH 分支)..."
cd "$DIST_DIR"

git init

if ! git remote | grep -q "origin"; then
  git remote add origin "$REPO_URL"
else
  git remote set-url origin "$REPO_URL" 
fi

git add -A

git -c user.name="Tender9" -c user.email="1505113506@qq.com" commit -m 'update'

# 强制推送到 root-pages 分支
if ! git push -f origin HEAD:"$BRANCH"; then
  echo "❌ 推送失败，终止执行"
  exit 1
fi

cd ..

echo "===== 清理临时文件 ====="
rm -rf "$DIST_DIR"

echo "===== 所有操作完成 ====="

# 项目地址 https://tender9.github.io/my_admin/
