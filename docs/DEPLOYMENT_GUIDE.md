# Animaker.AI 部署指南

## 前置准备

### 1. 安装依赖

```bash
npm install @sentry/nextjs --save
```

### 2. 配置 Vercel 环境变量

登录 Vercel Dashboard，配置以下环境变量：

#### 必须配置
```
DATABASE_URL=postgresql://...
AUTH_SECRET=<生成随机字符串>
GOOGLE_CLIENT_ID=<Google OAuth>
GOOGLE_CLIENT_SECRET=<Google OAuth>
CREEM_API_KEY=creem_DdgiufX2PQrrKvXL4WbKg
CREEM_WEBHOOK_SECRET=<从 Creem Dashboard 获取>
NEXT_PUBLIC_CREEM_PRODUCT_ID=prod_4VHIjHB1NzDa4CJPb9zFJ1
RUNNINGHUB_API_KEY=<RunningHub API Key>
RUNNINGHUB_WEBAPP_ID=1982768582520119298
R2_ACCOUNT_ID=<Cloudflare R2>
R2_ACCESS_KEY_ID=<Cloudflare R2>
R2_SECRET_ACCESS_KEY=<Cloudflare R2>
R2_BUCKET=make
R2_PUBLIC_URL=https://pub-xxx.r2.dev
```

#### 可选配置（Sentry）
```
NEXT_PUBLIC_SENTRY_DSN=https://xxx@sentry.io/xxx
SENTRY_AUTH_TOKEN=<用于上传 Source Map>
```

### 3. Creem Webhook 配置

1. 登录 [Creem Dashboard](https://dashboard.creem.io)
2. 进入 Webhooks 设置
3. 添加 Webhook URL: `https://www.animaker.dev/api/webhooks/creem`
4. 复制 Webhook Secret 并配置到 Vercel 环境变量 `CREEM_WEBHOOK_SECRET`
5. 启用事件: `checkout.completed`

### 4. Sentry 配置（可选）

1. 创建 Sentry 账号: https://sentry.io
2. 创建项目: `animaker-ai`
3. 获取 DSN 和 Auth Token
4. 配置到 Vercel 环境变量

### 5. 邮件转发配置

配置 `support@animaker.dev` 邮件转发：

**选项 A: Cloudflare Email Routing（推荐，免费）**
1. 登录 Cloudflare Dashboard
2. 选择域名 `animaker.dev`
3. 进入 Email Routing
4. 添加转发规则: `support@animaker.dev` → `ronandrake1999@gmail.com`

**选项 B: Resend**
1. 注册 Resend 账号
2. 配置域名验证
3. 设置转发规则

## 部署流程

### 1. 推送代码

```bash
git push origin main
```

### 2. Vercel 自动部署

Vercel 会自动检测到代码变更并开始部署。

### 3. 验证部署

```bash
# 测试首页
curl -I https://animaker.dev

# 测试 API
curl https://animaker.dev/api/user/me
```

## 验收测试

### SEO 测试
```bash
curl -I https://animaker.dev
# 预期: HTTP/1.1 200 OK
```

### 支付流程测试
1. 访问 https://animaker.dev/dashboard
2. 点击 "Buy Credits"
3. 完成测试支付
4. 验证积分到账

### Webhook 测试
使用 Creem Dashboard 的 Webhook 测试功能发送测试事件。

### Sentry 测试
触发一个测试错误，检查 Sentry Dashboard 是否收到。

## 故障排查

### 支付失败
- 检查 `CREEM_API_KEY` 是否正确
- 检查 `CREEM_WEBHOOK_SECRET` 是否配置
- 查看 Vercel Logs

### Webhook 签名验证失败
- 确认 `CREEM_WEBHOOK_SECRET` 与 Creem Dashboard 一致
- 检查 Webhook URL 是否正确

### Sentry 未上报错误
- 确认 `NEXT_PUBLIC_SENTRY_DSN` 已配置
- 检查 Sentry 项目配置

## 监控

### Vercel Analytics
自动启用，查看流量和性能数据。

### Sentry
查看错误率、响应时间等指标。

### Creem Dashboard
查看支付订单、成功率等数据。

---

**最后更新**: 2026-03-08
