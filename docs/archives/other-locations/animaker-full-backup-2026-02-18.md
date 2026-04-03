# Animaker.AI 完整备份清单
## 备份日期：2026-02-18

---

## 1. 代码仓库 ✅
- **GitHub**: https://github.com/shaomingchan/animaker-ai
- **最新 Commit**: e0bcafa (2026-02-18)
- **分支**: main
- **状态**: 所有代码已推送，working tree clean

---

## 2. 域名配置
- **旧域名**: animaker-ai.vercel.app
- **新域名**: animaker.dev
- **注册商**: Namecheap
- **DNS**: Cloudflare (Nameserver: aron.ns.cloudflare.com, dina.ns.cloudflare.com)
- **SSL**: Cloudflare Full (strict)

---

## 3. Vercel 部署
- **项目 ID**: prj_d3gbND3oXv0C6Hkit1qcHeJjNd4v
- **团队**: mingo's projects
- **最新部署**: dpl_6rALXBj17jgtD7JcvFo7SsMpvy13
- **状态**: READY

---

## 4. 环境变量（Vercel）

### 认证相关
- AUTH_URL
- AUTH_TRUST_HOST
- NEXTAUTH_URL = https://animaker.dev
- NEXTAUTH_SECRET

### Google OAuth
- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET
- **回调 URL**: https://animaker.dev/api/auth/callback/google

### 数据库
- DATABASE_URL = postgresql://neondb_owner:npg_Ry8Ry8Ry8@ep-quiet-mode-aiw1p876-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require

### Cloudflare R2
- R2_ACCOUNT_ID
- R2_ACCESS_KEY_ID
- R2_SECRET_ACCESS_KEY
- R2_BUCKET = make
- R2_PUBLIC_URL = https://pub-6870195e15d044f2944fc59f9ee569df.r2.dev

### RunningHub API
- RUNNINGHUB_API_KEY = cd6ee99cbcee4daf822daadebd75bfa4
- RUNNINGHUB_WEBAPP_ID = 1982768582520119298

### LemonSqueezy
- LEMONSQUEEZY_API_KEY
- LEMONSQUEEZY_STORE_ID
- LEMONSQUEEZY_PRODUCT_ID
- LEMONSQUEEZY_CHECKOUT_URL
- LEMONSQUEEZY_WEBHOOK_SECRET

---

## 5. 数据库（Neon PostgreSQL）
- **Host**: ep-quiet-mode-aiw1p876-pooler.c-4.us-east-1.aws.neon.tech
- **Database**: neondb
- **User**: neondb_owner
- **Password**: npg_Ry8Ry8Ry8
- **连接字符串**: 见上方 DATABASE_URL

### 表结构
- users (用户表)
- accounts (OAuth 账号关联)
- sessions (会话)
- tasks (视频生成任务)
- credits (积分记录)
- payments (支付记录)

**⚠️ 注意**: 数据库备份需要手动执行 pg_dump，或者在 Neon Dashboard 下载备份

---

## 6. 第三方服务账号

### Google Cloud Console
- **项目**: Animaker.AI
- **OAuth Client**: 已配置
- **回调 URL**: https://animaker.dev/api/auth/callback/google

### Cloudflare
- **账号**: ronandrake1999@gmail.com
- **R2 Bucket**: make
- **域名**: animaker.dev

### Neon
- **账号**: ronandrake1999@gmail.com
- **数据库**: neondb

### LemonSqueezy
- **账号**: ronandrake1999@gmail.com
- **Store**: Animaker.AI
- **Webhook**: https://animaker.dev/api/webhook/lemonsqueezy

### RunningHub
- **API Key**: cd6ee99cbcee4daf822daadebd75bfa4
- **WebApp ID**: 1982768582520119298

---

## 7. 恢复步骤（如果需要）

### 从零恢复整个项目：

1. **克隆代码**
   ```bash
   git clone https://github.com/shaomingchan/animaker-ai.git
   cd animaker-ai
   npm install
   ```

2. **配置环境变量**
   - 复制本文档中的所有环境变量到 `.env.local`
   - 或者在 Vercel 项目设置中重新添加

3. **数据库恢复**
   - 在 Neon 创建新数据库
   - 运行 `npx drizzle-kit push` 重建表结构
   - 如果有备份 SQL，执行 `psql < backup.sql`

4. **部署到 Vercel**
   ```bash
   vercel --prod
   ```

5. **配置域名**
   - Vercel 添加自定义域名
   - Cloudflare 添加 DNS 记录

---

## 8. 重要文件位置

### 本地备份
- 环境变量列表: `/home/node/clawd/canvas/animaker-env-backup-2026-02-18.txt`
- 本备份文档: `/home/node/clawd/canvas/animaker-full-backup-2026-02-18.md`

### 代码关键文件
- 数据库 Schema: `src/lib/db/schema.ts`
- API 路由: `src/app/api/`
- 环境变量配置: `.env.example`

---

## 9. 今日变更记录（2026-02-18）

1. ✅ 购买域名 animaker.dev ($13/年)
2. ✅ 配置 Cloudflare Nameserver
3. ✅ Vercel 添加自定义域名
4. ✅ 更新 NEXTAUTH_URL 环境变量
5. ✅ 更新 Google OAuth 回调 URL
6. ✅ 修复 og-image.png 缺失导致的构建错误
7. ✅ 推送 13 个 SEO 页面（对比页、用例页、博客）
8. ✅ 完成每日挚钱调研

---

## 10. 下一步待办

- [ ] 确认 animaker.dev 完全可访问
- [ ] 测试 Google 登录功能
- [ ] 测试支付流程
- [ ] 准备 Product Hunt 发布
- [ ] 考虑 Boilerplate 产品化

---

**备份完成时间**: 2026-02-18 19:52 CST
**备份执行者**: Kiro (OpenClaw AI Assistant)
