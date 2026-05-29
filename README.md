<div align="center">

# 🎯 DefyTON

**AI-powered habit challenge platform on Telegram**

Stake TON, complete daily missions verified by AI, earn rewards.

[![Java](https://img.shields.io/badge/Java-25-ED8B00?logo=openjdk&logoColor=white)](https://openjdk.org/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.0-6DB33F?logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TON](https://img.shields.io/badge/TON-Blockchain-0098EA?logo=ton&logoColor=white)](https://ton.org/)
[![Telegram](https://img.shields.io/badge/Telegram-Mini%20App-26A5E4?logo=telegram&logoColor=white)](https://core.telegram.org/bots/webapps)
[![AWS](https://img.shields.io/badge/AWS-EC2%20%7C%20RDS%20%7C%20S3-FF9900?logo=amazonaws&logoColor=white)](https://aws.amazon.com/)

[🌐 Live Service](https://defyton.com) · [📖 Documentation](https://shin-gs.github.io/tg-miniapp-challenge-docs/)

</div>

---

> **📌 Note:** This repository is auto-generated via GitHub Actions from a private source repository. It contains only design specifications and QA test checklists for external viewing. No source code, secrets, or business logic is included here.

---

## 👤 About

Solo full-stack development — Frontend, Backend, Blockchain integration, Infrastructure, and AI — all designed and implemented by a single developer.

## 🛠 Tech Stack

| Layer | Technologies |
|:------|:-------------|
| **Frontend** | ![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black) ![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript&logoColor=white) ![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white) ![Telegram](https://img.shields.io/badge/TWA%20SDK-8-26A5E4?style=flat-square&logo=telegram&logoColor=white) |
| **Backend** | ![Java](https://img.shields.io/badge/Java-25-ED8B00?style=flat-square&logo=openjdk&logoColor=white) ![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.0-6DB33F?style=flat-square&logo=springboot&logoColor=white) ![JPA](https://img.shields.io/badge/Spring%20Data-JPA-6DB33F?style=flat-square&logo=spring&logoColor=white) ![Gradle](https://img.shields.io/badge/Gradle-Kotlin%20DSL-02303A?style=flat-square&logo=gradle&logoColor=white) |
| **Database** | ![MySQL](https://img.shields.io/badge/MySQL-8.4%20LTS-4479A1?style=flat-square&logo=mysql&logoColor=white) ![S3](https://img.shields.io/badge/S3-Storage-569A31?style=flat-square&logo=amazons3&logoColor=white) ![CloudFront](https://img.shields.io/badge/CloudFront-CDN-8C4FFF?style=flat-square&logo=amazonaws&logoColor=white) |
| **Blockchain** | ![TON](https://img.shields.io/badge/TON-ton4j%202.0.3-0098EA?style=flat-square&logo=ton&logoColor=white) ![TON Connect](https://img.shields.io/badge/TON%20Connect-Wallet-0098EA?style=flat-square&logo=ton&logoColor=white) ![Stars](https://img.shields.io/badge/Telegram-Stars-26A5E4?style=flat-square&logo=telegram&logoColor=white) |
| **AI** | ![OpenRouter](https://img.shields.io/badge/OpenRouter-GPT--4o%20Vision-412991?style=flat-square&logo=openai&logoColor=white) |
| **Infra** | ![EC2](https://img.shields.io/badge/EC2-t3.medium-FF9900?style=flat-square&logo=amazonec2&logoColor=white) ![RDS](https://img.shields.io/badge/RDS-MySQL-527FFF?style=flat-square&logo=amazonrds&logoColor=white) ![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=flat-square&logo=docker&logoColor=white) ![Nginx](https://img.shields.io/badge/Nginx-Proxy-009639?style=flat-square&logo=nginx&logoColor=white) ![Actions](https://img.shields.io/badge/GitHub-Actions-2088FF?style=flat-square&logo=githubactions&logoColor=white) |

## 🏗 Architecture

```mermaid
graph TB
    subgraph Client
        User([👤 Telegram User])
        AdminUser([👨‍💼 Admin])
    end

    subgraph Frontend
        MiniApp[📱 React Mini App<br/>Vite + TypeScript + Tailwind]
        AdminApp[🖥 Admin Dashboard<br/>React SPA]
    end

    subgraph Backend
        API[⚙️ Spring Boot API<br/>Java 25]
        Bot[🤖 Telegram Bot<br/>Webhook Handler]
    end

    subgraph External Services
        TON[💎 TON Blockchain<br/>ton4j + AdnlLiteClient]
        AI[🧠 OpenRouter<br/>GPT-4o Vision]
        TG[📨 Telegram API<br/>Bot + Payments]
    end

    subgraph AWS
        DB[(🗄 MySQL 8.4<br/>RDS)]
        S3[📦 S3<br/>Image Storage]
        CDN[🌐 CloudFront<br/>cdn.defyton.com]
    end

    subgraph Infrastructure
        Nginx[🔀 Nginx<br/>Reverse Proxy + SSL]
        Docker[🐳 Docker Compose<br/>Blue-Green Deploy]
    end

    User --> MiniApp
    AdminUser --> AdminApp
    MiniApp --> Nginx
    AdminApp --> Nginx
    Nginx --> Docker
    Docker --> API
    API --> DB
    API --> TON
    API --> AI
    API --> TG
    API --> S3
    S3 --> CDN
    Bot --> API
```

## ☁️ Infrastructure

| Component | Details |
|:----------|:--------|
| **Compute** | AWS EC2 (t3.medium) — Blue-Green deployment (blue:8081 / green:8082) |
| **Database** | AWS RDS MySQL 8.4 LTS — automated backups, LTS support until 2032 |
| **Storage** | AWS S3 — verification photos, profile images |
| **CDN** | CloudFront — custom domain `cdn.defyton.com`, image optimization |
| **Proxy** | Nginx — reverse proxy, SSL termination, upstream hot-swap |
| **Container** | Docker Compose — single JAR packaging (FE + BE bundled) |
| **SSL** | Let's Encrypt — automated certificate renewal |
| **CI/CD** | GitHub Actions — SSH/SCP deploy, zero-downtime switching |
| **Logging** | 3-tier log separation (app / error / financial) + S3 cron backup |

## 🔑 Key Features

- 💎 **Dual payment system** — TON Connect (blockchain direct, 10% fee) + Telegram Stars (no wallet needed)
- ⛓️ **Blockchain integration** — Deposit verification via AdnlLiteClient, seqno-based double-spend prevention
- 🧠 **AI-powered verification** — GPT-4o Vision judges photos, graceful fallback on parse failure
- 🔐 **Security** — Admin OTP 2FA, JWT, HMAC-SHA256 initData validation, XOR+Base62 ID obfuscation
- 📊 **Financial integrity** — balance_before/after audit trail, idempotency keys, synchronized transfers
- 🚀 **Zero-downtime deploy** — Blue-Green with health check polling + nginx upstream hot-swap

## 🤖 Development Process

```
📋 Planning ──→ 🎨 Design ──→ 💻 Implementation ──→ 🔍 Review ──→ ✅ QA
     │               │                │                   │            │
 product-planner  ui-designer   frontend-developer  code-reviewer  qa-tester
                               backend-developer   java-architect
```

- **AI agent-driven pipeline** — Specialized agents for each role, orchestrated by a main agent
- **Document-driven development** — `.cases.md` → HTML/CSS design specs → code → QA checklists
- **Steering documents** — Agent behavior rules, coding standards, and conventions as always-on context
- **Single source of truth** — Business logic document drives all implementation decisions
- **GitHub Pages** — Design specs and QA checklists auto-deployed for external access

## 📖 Documentation

<div align="center">

📎 **[View Design Docs & QA Checklists →](https://shin-gs.github.io/tg-miniapp-challenge-docs/)**

</div>

- 🎨 **Design Specs** — All screens as interactive HTML/CSS (viewable in browser, no build required)
- ✅ **QA Checklists** — Pass/Fail/Skip tracking per test case (localStorage persistence, URL hash routing)

## 🔗 Links

| | URL |
|:--|:----|
| 🌐 Service | https://defyton.com |
| 📖 Docs | https://shin-gs.github.io/tg-miniapp-challenge-docs/ |

## 🔒 Security

All secrets and configuration values (API keys, database credentials, wallet mnemonics, JWT secrets) are managed exclusively via `.env` files and never committed to version control. Environment-specific settings are injected at runtime through Docker environment variables.
