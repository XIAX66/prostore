This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Prostore - E-commerce Platform

![Project Banner]() <!-- 可添加项目封面图 -->

## 目录

- [项目简介](#项目简介)
- [功能概览](#功能概览)
- [技术栈](#技术栈)
- [快速开始](#快速开始)
- [环境变量](#环境变量)
- [部署指南](#部署指南)
- [测试](#测试)
- [贡献指南](#贡献指南)
- [许可证](#许可证)

## 项目简介

一个全栈电商平台，支持：

- 多角色用户系统（普通用户/管理员）
- 完整的购物流程（浏览→加购→支付→订单管理）
- 双支付网关集成（Stripe & PayPal）
- 响应式设计 + 主题切换
- 管理员仪表盘与资源管理
- 商品评价系统

## 功能概览

### 用户侧功能

- 🛍️ 商品浏览
  - 首页轮播展示精选商品
  - 最新商品展示（前4项）
  - 分类/价格/评分高级过滤
  - 多图商品展示（支持缩略图切换）
- 🛒 购物流程
  - 实时购物车管理（数量增减）
  - 多步骤结账流程（商品→地址→支付→确认）
  - 订单历史查询
- 🔐 用户系统
  - 本地注册/登录（BCRYPT加密）
  - 用户资料管理
  - 商品评价权限控制
- 💳 支付集成
  - Stripe信用卡支付
  - PayPal支付

### 管理员功能

- 📊 仪表盘
  - 月度销售数据可视化
- 🛠️ 资源管理
  - 商品CRUD操作
  - 用户权限管理
  - 订单状态追踪

### 高级功能

- 🖼️ 图片上传（集成Uploadthing服务）
- 🌓 明暗主题切换
- ⏳ 限时促销倒计时
- 🔍 全局搜索功能

## 技术栈

**核心架构**

- ⚡ Next.js 15 (App Router)
- 🌀 React 19

**数据库**

- 🐘 PostgreSQL (Vercel/NEON托管)
- 🛢 Prisma ORM

**前端**

- � TypeScript
- 📐 shadcn UI
- 📝 React Hook Form + Zod验证
- 🛡 Next Auth身份验证

**支付**

- 💳 Stripe支付网关
- 🏷️ PayPal React SDK

**工具**

- 🧪 Jest测试框架
- 🔍 ESLint代码规范
- 🚀 Vercel一键部署

## 快速开始

```bash
# 克隆仓库
git clone https://github.com/xiax66/prostore.git

# 安装依赖
npm install

# 配置环境变量
cp .env.example .env.local

# 数据库迁移
npx prisma migrate deploy
npx prisma generate

# 启动开发服务器
npm run dev
```

## 环境变量

```env
DATABASE_URL="postgres://..."  # NEON PostgreSQL连接地址
NEXTAUTH_SECRET="your_secret"
NEXTAUTH_URL="http://localhost:3000"
UPLOADTHING_SECRET="..."
UPLOADTHING_APP_ID="..."
STRIPE_PUBLIC_KEY="..."
STRIPE_SECRET_KEY="..."
PAYPAL_CLIENT_ID="..."
```

## 部署指南

1. 将仓库连接至Vercel

2. 在Vercel控制台配置环境变量

3. 自动部署触发条件：

   - 主分支更新时自动部署
   - 数据库通过NEON自动配置

4. 配置Stripe/PayPal回调：

   ```bash
   vercel env add STRIPE_WEBHOOK_SECRET production
   ```

## 测试

```bash
# 运行单元测试
npm test

# 生成测试覆盖率报告
npm test -- --coverage
```

测试范围包括：

- 核心业务逻辑
- API端点
- UI组件交互

## 贡献指南

欢迎通过Issues提交改进建议或通过Pull Request贡献代码：

1. Fork仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交修改 (`git commit -m 'Add some amazing feature'`)
4. 推送分支 (`git push origin feature/amazing-feature`)
5. 发起Pull Request

## 许可证

[MIT](https://choosealicense.com/licenses/mit/)

---

> 🌟 **特别感谢**：本项目的开发使用了以下优秀服务/库：
>
> - [Uploadthing](https://uploadthing.com/) 提供的文件上传解决方案
> - [shadcn/ui](https://ui.shadcn.com/) 提供的UI组件库
> - Vercel提供的全栈部署平台

建议添加以下内容增强可读性：

1. 在适当位置添加截图/GIF演示
2. 添加在线演示链接
3. 核心功能流程图（可选）
4. 项目架构图（可选）
