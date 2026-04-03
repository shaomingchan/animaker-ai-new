# Animaker.AI DevOps 审计报告

> 审计时间：2026-02-25 11:55 (Asia/Shanghai)
> 审计人：COO（DevOps agent 未能完成，COO 接手）

---

## 1. 安全漏洞

**2 个漏洞（1 high, 1 critical）：**
- `fast-xml-parser` 4.1.3-5.3.5：DoS 攻击 + 正则注入
- 影响：`@aws-sdk/xml-builder` 依赖了有漏洞版本
- 修复：`npm audit fix`

## 2. 环境变量清单

| 变量名 | 用途 | 必需 |
|--------|------|------|
| DATABASE_URL | Neon PostgreSQL | ✅ |
| GOOGLE_CLIENT_ID | Google OAuth | ✅ |
| GOOGLE_CLIENT_SECRET | Google OAuth | ✅ |
| R2_ACCOUNT_ID | Cloudflare R2 | ✅ |
| R2_ACCESS_KEY_ID | R2 认证 | ✅ |
| R2_SECRET_ACCESS_KEY | R2 认证 | ✅ |
| R2_PUBLIC_URL | R2 公开域名 | ✅ |
| R2_BUCKET | R2 桶名 | ⚠️ 默认 'make' |
| RUNNINGHUB_API_KEY | RunningHub AI | ✅ |
| RUNNINGHUB_WEBAPP_ID | RH 工作流 ID | ⚠️ 有默认值 |
| PADDLE_PRICE_ID | Paddle 定价 | ⏳ 待配置 |
| PADDLE_WEBHOOK_SECRET | Paddle 回调 | ⏳ 待配置 |
| NEXT_PUBLIC_PADDLE_SELLER_ID | Paddle 前端 | ⏳ 待配置 |
| LEMONSQUEEZY_WEBHOOK_SECRET | LS 回调（旧） | ❌ 可移除 |

## 3. next.config.ts 优化建议

当前配置较简洁，建议添加：
- `images.remotePatterns` — 允许 R2 域名图片优化
- `poweredByHeader: false` — 隐藏 X-Powered-By
- `compress: true` — 启用 gzip（Vercel 默认开启）

## 4. 依赖评估

- LemonSqueezy 相关代码可清理（已切换到 Paddle）
- `@aws-sdk/client-s3` 是 R2 必需，保留

## 5. 行动项

- [ ] 运行 `npm audit fix` 修复安全漏洞
- [ ] 清理 LemonSqueezy webhook 路由
- [ ] 配置 Paddle 环境变量（等注册完成）
- [ ] next.config 添加安全头

---

*DevOps agent 评分：⭐2（两次未完成，需优化 prompt 或换模型）*
