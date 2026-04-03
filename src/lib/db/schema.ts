import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  uuid,
  varchar,
  pgEnum,
} from "drizzle-orm/pg-core"
import type { AdapterAccountType } from "next-auth/adapters"

// --- Original Enums ---
export const planEnum = pgEnum('plan', ['free', 'basic', 'pro', 'business']);
export const taskStatusEnum = pgEnum('task_status', ['queued', 'uploading', 'running', 'success', 'failed']);
export const orderStatusEnum = pgEnum('order_status', ['pending', 'paid', 'refunded']);
export const paymentProviderEnum = pgEnum('payment_provider', ['wechat', 'alipay', 'lemonsqueezy', 'creem', 'paddle']);
export const currencyEnum = pgEnum('currency', ['CNY', 'USD']);

// --- Auth.js Tables ---

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  // App Specific Fields
  credits: integer('credits').notNull().default(0),
  plan: planEnum('plan').notNull().default('free'),
  planExpiresAt: timestamp('plan_expires_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [
    {
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
      }),
    }
  ]
)

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
})

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => [
    {
      compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
    }
  ]
)

// --- App Specific Tables ---

export const tasks = pgTable('tasks', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: "cascade" }),
  status: taskStatusEnum('status').notNull().default('queued'),
  imageKey: varchar('image_key', { length: 512 }),
  videoKey: varchar('video_key', { length: 512 }),
  resultKey: varchar('result_key', { length: 512 }),
  rhTaskId: varchar('rh_task_id', { length: 64 }),
  rhImageFile: varchar('rh_image_file', { length: 512 }),
  rhVideoFile: varchar('rh_video_file', { length: 512 }),
  resolution: integer('resolution').notNull().default(540),
  duration: integer('duration').notNull().default(5),
  fps: integer('fps').notNull().default(30),
  rhCoinsCost: integer('rh_coins_cost'),
  errorMessage: text('error_message'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  completedAt: timestamp('completed_at'),
})

export const orders = pgTable('orders', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: "cascade" }),
  provider: paymentProviderEnum('provider').notNull(),
  providerOrderId: varchar('provider_order_id', { length: 255 }),
  plan: planEnum('plan'),
  credits: integer('credits').notNull(),
  amount: integer('amount').notNull(), // in cents
  currency: currencyEnum('currency').notNull(),
  status: orderStatusEnum('status').notNull().default('pending'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  paidAt: timestamp('paid_at'),
})
