# Draw.io Diagram Skill

## 项目愿景

一个独立的 Claude Code Skill，用于从自然语言描述生成专业的 draw.io 图表文件（`.drawio`），不依赖 MCP。支持流程图、架构图、时序图、ER图、思维导图等多种图表类型。

---

## 架构总览

```
drawio-skill/
├── .claude/
│   └── skills/
│       └── drawio-diagram/     # 核心 Skill 定义
│           └── skill.md        # Skill 规范文档
├── drawio/                     # 生成的图表默认输出目录
│   └── user-login-flow.drawio  # 示例图表
└── .gitignore
```

**技术栈：**
- Skill 定义格式: Markdown
- 输出格式: draw.io XML (mxGraphModel)
- 运行环境: Claude Code CLI

---

## 模块结构图

```mermaid
graph TD
    A["(根) drawio-skill"] --> B[".claude/skills"];
    B --> C["drawio-diagram"];
    A --> D["drawio"];

    click C "./.claude/skills/drawio-diagram/CLAUDE.md" "查看 drawio-diagram 模块文档"
```

---

## 模块索引

| 模块 | 路径 | 职责 |
|------|------|------|
| drawio-diagram | `.claude/skills/drawio-diagram/` | 核心 Skill，定义图表生成规则与模板 |

---

## 运行与开发

### 使用方式

1. **触发 Skill：**
   - 使用 `/drawio-diagram` 命令
   - 或自然语言："create a diagram", "draw a flowchart", "generate architecture diagram"

2. **示例提示词：**
   ```
   Create a user login flow with input validation and error handling
   Draw an AWS architecture with CloudFront, ALB, EC2, and RDS
   Generate a sequence diagram showing API authentication flow
   ```

3. **查看输出：**
   - 默认输出到 `./drawio/` 目录
   - 文件可用 [diagrams.net](https://app.diagrams.net/) 或 draw.io 桌面版打开

### 输出路径规则

| 用户请求 | 输出路径 |
|----------|----------|
| 未指定路径 | `./drawio/<auto-name>.drawio` |
| 仅文件名 | `./drawio/<filename>.drawio` |
| 相对路径 | `<指定路径>/<auto-name>.drawio` |
| 绝对路径 | `<绝对路径>/<auto-name>.drawio` |

---

## 支持的图表类型

| 类型 | 描述 | 布局方向 |
|------|------|----------|
| 流程图 (Flowchart) | 业务流程、算法逻辑 | 自上而下 |
| 架构图 (Architecture) | 系统架构、云服务 | 自左向右 |
| 时序图 (Sequence) | API 调用、消息传递 | 列式布局 |
| ER 图 (Entity-Relationship) | 数据库模型 | 自由布局 |
| 思维导图 (Mind Map) | 概念整理、头脑风暴 | 径向布局 |

---

## 云服务图标支持

- **AWS (aws4)**: EC2, Lambda, S3, RDS, DynamoDB, API Gateway, CloudFront, ALB/ELB, VPC, Route 53, SNS, SQS, Cognito, CloudWatch
- **GCP (gcp2)**: Compute Engine, Cloud Functions, Cloud Storage, Cloud SQL, BigQuery, Pub/Sub, Cloud Run, GKE
- **Azure (azure2)**: Virtual Machine, App Service, Functions, SQL Database, Cosmos DB, Blob Storage, API Management, AKS
- **Kubernetes**: Pod, Service, Deployment, ConfigMap, Secret, Ingress, PersistentVolume, Namespace

---

## 编码规范

### XML 结构要求

1. **完整包装器**: 必须包含 `<mxfile>` 根元素
2. **保留 ID**: `id="0"` 和 `id="1"` 为根单元格，不可修改
3. **用户元素 ID 从 2 开始**
4. **所有 mxCell 必须是兄弟节点**，不可嵌套
5. **特殊字符转义**: `<` -> `&lt;`, `>` -> `&gt;`, `&` -> `&amp;`

### 布局约束

- 画布尺寸: 800 x 600 像素
- 安全区域: x: 40-760, y: 40-560
- 元素间距: 最小 150px
- 采用 4x3 网格系统定位

---

## AI 使用指引

### 生成前检查清单

- [ ] 确定图表类型（流程图/架构图/时序图/ER图/思维导图）
- [ ] 统计节点和关系数量
- [ ] 规划网格位置
- [ ] 识别潜在的边缘交叉点
- [ ] 确定是否需要云服务图标

### 生成后验证清单

- [ ] 完整的包装器结构
- [ ] 根单元格存在 (`id="0"` 和 `id="1"`)
- [ ] 所有 ID 唯一且从 "2" 开始
- [ ] 所有边有有效的 source/target
- [ ] 坐标在边界内
- [ ] 元素无重叠

---

## 变更记录 (Changelog)

| 日期 | 版本 | 变更内容 |
|------|------|----------|
| 2026-01-21 | 1.0.0 | 初始化项目文档 |
