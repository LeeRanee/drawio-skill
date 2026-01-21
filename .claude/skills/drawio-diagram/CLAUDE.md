[根目录](../../../CLAUDE.md) > [.claude](../../) > [skills](../) > **drawio-diagram**

---

# drawio-diagram 模块

## 模块职责

核心 Claude Code Skill 模块，定义从自然语言描述生成 draw.io 图表的完整规范，包括：

- XML 结构规范与模板
- 布局系统与网格映射
- 边缘路由规则
- 样式参考（形状、颜色、边缘）
- 云服务图标库（AWS/GCP/Azure/Kubernetes）
- 验证检查清单

---

## 入口与启动

**Skill 定义文件：** `skill.md`

**触发方式：**
- 命令: `/drawio-diagram`
- 自然语言: "create a diagram", "draw a flowchart", "generate architecture diagram"

**激活条件：** 用户请求涉及图表创建时自动激活

---

## 对外接口

### 输入

自然语言描述，例如：
- "Create a user login flow with input validation"
- "Draw an AWS architecture with EC2 and RDS"
- "Generate a sequence diagram for API authentication"

### 输出

`.drawio` XML 文件，符合 mxGraphModel 规范，可直接在 diagrams.net 或 draw.io 桌面版打开。

---

## 关键依赖与配置

**无外部依赖** - 纯 Skill 定义，不依赖 MCP 或其他服务。

**输出目录配置：**
- 默认: `./drawio/`
- 可通过用户请求指定自定义路径

---

## 数据模型

### XML 结构

```xml
<mxfile host="app.diagrams.net">
  <diagram id="..." name="...">
    <mxGraphModel dx="800" dy="600" grid="1" ...>
      <root>
        <mxCell id="0"/>           <!-- 根单元格 -->
        <mxCell id="1" parent="0"/> <!-- 默认父级 -->
        <!-- 用户元素从 id="2" 开始 -->
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
```

### 元素类型

| 类型 | 标识 | 说明 |
|------|------|------|
| 形状 (Vertex) | `vertex="1"` | 矩形、椭圆、菱形等 |
| 连接器 (Edge) | `edge="1"` | 箭头、连线 |
| 容器 (Container) | `swimlane` style | 泳道、分组 |

---

## 测试与质量

### 示例文件

`../../drawio/user-login-flow.drawio` - 用户登录流程图示例，用于验证 Skill 输出正确性。

### 验证要点

1. 文件可在 diagrams.net 正常打开
2. 所有形状正确渲染
3. 连接线正确连接
4. 布局合理，无重叠

---

## 常见问题 (FAQ)

**Q: 文件无法打开？**
A: 检查是否包含完整的 `<mxfile>` 包装器，确保 `id="0"` 和 `id="1"` 根单元格存在。

**Q: 云图标不显示？**
A: 云图标需要网络连接加载图标库。首次使用后会缓存。离线时建议使用通用形状。

**Q: 如何指定输出路径？**
A: 在请求中说明，如 "save to /docs/diagrams/my-flow.drawio"

---

## 相关文件清单

| 文件 | 说明 |
|------|------|
| `skill.md` | Skill 核心定义（924 行） |
| `../../drawio/user-login-flow.drawio` | 示例输出文件 |

---

## 变更记录 (Changelog)

| 日期 | 版本 | 变更内容 |
|------|------|----------|
| 2026-01-21 | 1.0.0 | 初始化模块文档 |
