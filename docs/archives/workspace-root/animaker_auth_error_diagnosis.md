# Animaker Google 登录错误诊断报告

## 错误信息
```
AuthApiError: Database error saving new user
```

## 问题原因分析

### 1. 数据库表未创建或结构不匹配 ⚠️ **主要原因**

**发现：**
- 项目中没有 `drizzle` 迁移文件夹
- `package.json` 中没有数据库迁移相关的脚本（如 `db:push`, `db:migrate`）
- 这意味着数据库表可能从未被创建，或者结构与代码不匹配

**具体问题：**
当用户通过 Google 登录时，NextAuth 尝试：
1. 在 `user` 表中创建新用户
2. 在 `account` 表中保存 Google 账户信息
3. 在 `session` 表中创建会话

如果这些表不存在或结构不对，就会报 "Database error saving new user"

### 2. Email 唯一约束冲突（次要可能）

**Schema 定义：**
```typescript
email: text("email").unique()
```

如果同一个 Google 账户多次尝试登录，可能触发唯一约束冲突。

### 3. 必填字段缺失

**Schema 中的必填字段：**
```typescript
credits: integer('credits').notNull().default(0),
plan: planEnum('plan').notNull().default('free'),
createdAt: timestamp('created_at').notNull().defaultNow(),
```

如果数据库表中这些字段没有默认值，插入会失败。

## 解决方案

### 方案 1：生成并执行数据库迁移（推荐）

```bash
cd /home/node/clawd/animaker-ai

# 1. 安装 drizzle-kit（如果没有）
npm install -D drizzle-kit

# 2. 生成迁移文件
npx drizzle-kit generate

# 3. 推送到数据库（直接同步 schema）
npx drizzle-kit push

# 或者执行迁移
npx drizzle-kit migrate
```

### 方案 2：手动创建表（快速修复）

直接在 Neon 数据库控制台执行以下 SQL：

```sql
-- 创建枚举类型
CREATE TYPE plan AS ENUM ('free', 'basic', 'pro', 'business');
CREATE TYPE task_status AS ENUM ('queued', 'uploading', 'running', 'success', 'failed');
CREATE TYPE order_status AS ENUM ('pending', 'paid', 'refunded');
CREATE TYPE payment_provider AS ENUM ('wechat', 'alipay', 'lemonsqueezy');
CREATE TYPE currency AS ENUM ('CNY', 'USD');

-- 创建 user 表
CREATE TABLE "user" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT,
  "email" TEXT UNIQUE,
  "emailVerified" TIMESTAMP,
  "image" TEXT,
  "credits" INTEGER NOT NULL DEFAULT 0,
  "plan" plan NOT NULL DEFAULT 'free',
  "plan_expires_at" TIMESTAMP,
  "created_at" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- 创建 account 表
CREATE TABLE "account" (
  "userId" TEXT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "type" TEXT NOT NULL,
  "provider" TEXT NOT NULL,
  "providerAccountId" TEXT NOT NULL,
  "refresh_token" TEXT,
  "access_token" TEXT,
  "expires_at" INTEGER,
  "token_type" TEXT,
  "scope" TEXT,
  "id_token" TEXT,
  "session_state" TEXT,
  PRIMARY KEY ("provider", "providerAccountId")
);

-- 创建 session 表
CREATE TABLE "session" (
  "sessionToken" TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "expires" TIMESTAMP NOT NULL
);

-- 创建 verificationToken 表
CREATE TABLE "verificationToken" (
  "identifier" TEXT NOT NULL,
  "token" TEXT NOT NULL,
  "expires" TIMESTAMP NOT NULL,
  PRIMARY KEY ("identifier", "token")
);

-- 创建 tasks 表
CREATE TABLE "tasks" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "user_id" TEXT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "status" task_status NOT NULL DEFAULT 'queued',
  "image_key" VARCHAR(512),
  "video_key" VARCHAR(512),
  "result_key" VARCHAR(512),
  "rh_task_id" VARCHAR(64),
  "rh_image_file" VARCHAR(512),
  "rh_video_file" VARCHAR(512),
  "resolution" INTEGER NOT NULL DEFAULT 540,
  "duration" INTEGER NOT NULL DEFAULT 5,
  "fps" INTEGER NOT NULL DEFAULT 30,
  "rh_coins_cost" INTEGER,
  "error_message" TEXT,
  "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
  "completed_at" TIMESTAMP
);

-- 创建 orders 表
CREATE TABLE "orders" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "user_id" TEXT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "provider" payment_provider NOT NULL,
  "provider_order_id" VARCHAR(255),
  "plan" plan,
  "credits" INTEGER NOT NULL,
  "amount" INTEGER NOT NULL,
  "currency" currency NOT NULL,
  "status" order_status NOT NULL DEFAULT 'pending',
  "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
  "paid_at" TIMESTAMP
);
```

### 方案 3：添加数据库脚本到 package.json

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "db:generate": "drizzle-kit generate",
    "db:push": "drizzle-kit push",
    "db:migrate": "drizzle-kit migrate",
    "db:studio": "drizzle-kit studio"
  }
}
```

## 验证步骤

执行修复后，验证：

1. 检查表是否存在：
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';
```

2. 检查 user 表结构：
```sql
\d user
```

3. 尝试手动插入测试用户：
```sql
INSERT INTO "user" (id, email, name) 
VALUES ('test-123', 'test@example.com', 'Test User');
```

4. 重新尝试 Google 登录

## 预防措施

1. 在 `package.json` 添加数据库相关脚本
2. 在部署流程中添加数据库迁移步骤
3. 使用 `drizzle-kit push` 在开发环境同步 schema
4. 考虑添加数据库健康检查端点

## 紧急修复建议

**立即执行：**
```bash
cd /home/node/clawd/animaker-ai
npx drizzle-kit push
```

这会直接将 schema.ts 中定义的表结构同步到 Neon 数据库，无需手动写 SQL。

---

**报告时间：** 2026-02-20 18:45 UTC  
**严重程度：** 高（影响所有新用户登录）  
**预计修复时间：** 5-10 分钟
