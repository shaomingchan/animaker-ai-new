# Animaker.AI 项目文档

> 最后整理时间：2026-04-03 | 整理人：COO

## 目录结构

```
docs/
├── README.md                        ← 本文档
├── PRODUCT_HANDBOOK.md              ← 产品知识手册（必读）
├── PAYMENT_PRD.md                   ← 支付产品需求文档
├── PRICING_MODEL.md                 ← 定价模型
├── PIETER_FEEDBACK.md               ← Pieter Levels 反馈
├── DEVOPS_AUDIT.md                  ← DevOps 安全审计
├── CODEX_REVIEW.md                  ← Codex 代码审查报告（Critical）
├── CODEX_PHASE2.md                  ← Codex Phase2 输出
├── CLAUDE_FIX_REPORT.md             ← Claude Fix 报告
├── FINAL_STATUS.md                  ← 最终状态报告
├── DAY1_COMPLETION_REPORT.md        ← Day1 完成报告
├── DAY1_SUMMARY.md                  ← Day1 摘要
├── day2-completion-report.md         ← Day2 完成报告
├── debug-report-2026-02-18.md       ← 调试报告
├── DEPLOYMENT_GUIDE.md              ← 部署指南
├── marketing/
│   └── social-media-copy.md         ← 社媒文案
└── archives/                         ← 历史归档（不常参考）
    ├── workspace-root/               ← workspace 根目录迁移文件
    │   ├── PROJECT_POSTMORTEM.md    ← 项目复盘报告
    │   ├── WORLD_CLASS_REVIEW.md   ← 竞品分析
    │   ├── animaker_revenue_forecast.md
    │   └── animaker_auth_error_diagnosis.md
    └── other-locations/
        ├── animaker-full-backup-2026-02-18.md
        └── animaker-ai.md
```

## 阅读优先级

1. **产品手册** → 了解业务背景
2. **Pieter 反馈** → 外部视角 + 待办优先级
3. **Codex Review** → 知道了什么代码坏、什么待修
4. **Payment PRD** → 支付逻辑设计
5. **DevOps 审计** → 安全和部署现状

## ⚠️ 重要：当前生产问题

线上版本停滞在 **2026-03-30**。登录卡 + 支付坏 = 部署链路断裂导致旧代码在跑。

部署修复方案另见：workspace `/home/node/clawd/` 内 COO 待处理任务。

