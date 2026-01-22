---
name: drawio-diagram
description: Generate, modify, validate, and repair draw.io diagrams from natural language. Use when creating flowcharts, architecture diagrams, sequence diagrams, ER diagrams, or mind maps. Triggers: /drawio-diagram, "create a diagram", "draw a flowchart", "generate architecture diagram", "modify the diagram", "validate the diagram", "repair the diagram", "画一个流程图", "生成架构图", "修改图表", "验证图表", "修复图表"
---

# Draw.io Diagram Generator

Generate, modify, validate, and repair draw.io diagrams from natural language descriptions. Creates valid `.drawio` files that can be opened directly in diagrams.net or draw.io desktop.

## Capabilities

- **Create** flowcharts, architecture diagrams, sequence diagrams, ER diagrams, and mind maps
- **Modify** existing diagrams by adding, updating, or removing elements
- **Validate** diagram XML structure for correctness
- **Repair** common XML issues automatically
- Support cloud architecture icons (AWS, GCP, Azure, Kubernetes)

## Output Path Rules

| User Request | Output Path |
|--------------|-------------|
| No path specified | `./drawio/<auto-name>.drawio` |
| Filename only | `./drawio/<filename>.drawio` |
| Relative path | `<path>/<auto-name>.drawio` |
| Absolute path | `<absolute-path>/<auto-name>.drawio` |

## Operation Workflows

### Generate Workflow

1. **Parse Request** - Identify diagram type, components, relationships
2. **Plan Layout** - Determine grid positions, avoid overlaps
3. **Generate XML** - Create complete mxGraphModel structure
4. **Write File** - Save to `./drawio/<name>.drawio`
5. **Report** - Confirm file location

### Modify Workflow

1. **Locate File** - Find the `.drawio` file
2. **Read Content** - Load and parse XML
3. **Apply Changes** - Add/update/delete elements
4. **Validate** - Check XML validity
5. **Write File** - Save changes
6. **Report** - Summarize changes

### Validate Workflow

1. **Locate File** - Find the `.drawio` file
2. **Run Validation** - Check 10+ rules
3. **Report Results** - List issues or confirm validity

### Repair Workflow

1. **Create Backup** - Save original as `.drawio.backup`
2. **Diagnose Issues** - Identify problems
3. **Apply Fixes** - Auto-repair 20+ issue types
4. **Validate Result** - Verify repairs
5. **Report** - List fixes applied

## Output Contract

ALWAYS output complete `.drawio` file:

```xml
<mxfile host="app.diagrams.net" modified="2024-01-01T00:00:00.000Z" agent="Claude" version="1.0">
  <diagram id="diagram-1" name="Page-1">
    <mxGraphModel dx="800" dy="600" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="800" pageHeight="600">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        <!-- User elements (id starting from "2") -->
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
```

### Critical Rules

1. **Always include complete wrapper** - Files without proper wrapper cannot be opened
2. **Reserved IDs**: `id="0"` and `id="1"` are root cells - NEVER modify
3. **User elements start from `id="2"`**
4. **All mxCell must be siblings** - NEVER nest mxCell
5. **Set `parent="1"`** for top-level shapes

## XML Structure

### Shape (Vertex)

```xml
<mxCell id="2" value="Label" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" vertex="1" parent="1">
  <mxGeometry x="100" y="100" width="120" height="60" as="geometry"/>
</mxCell>
```

### Connector (Edge)

```xml
<mxCell id="3" style="edgeStyle=orthogonalEdgeStyle;rounded=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;endArrow=classic;" edge="1" parent="1" source="2" target="4">
  <mxGeometry relative="1" as="geometry"/>
</mxCell>
```

### Special Character Escaping

| Character | Escape |
|-----------|--------|
| `<` | `&lt;` |
| `>` | `&gt;` |
| `&` | `&amp;` |
| `"` | `&quot;` |
| `'` | `&apos;` |

## Layout System

### Canvas Constraints

- **Canvas size**: 800 x 600 pixels
- **Safe area**: x: 40-760, y: 40-560
- **Element spacing**: Minimum 150px

### Grid System (4x3)

```
+----------+----------+----------+----------+
|  (0,0)   |  (1,0)   |  (2,0)   |  (3,0)   |  y: 40-200
+----------+----------+----------+----------+
|  (0,1)   |  (1,1)   |  (2,1)   |  (3,1)   |  y: 200-400
+----------+----------+----------+----------+
|  (0,2)   |  (1,2)   |  (2,2)   |  (3,2)   |  y: 400-560
+----------+----------+----------+----------+
  x:40-200  200-400   400-600   600-760
```

### Layout Patterns

- **Flowchart**: Top-to-bottom, start at (1,0) or (2,0)
- **Architecture**: Left-to-right, users left, data right
- **Sequence**: Columns for participants, messages top-to-bottom
- **Mind Map**: Central topic, radial branches

## Edge Routing

### Anchor Points (0-1 range)

```
        (0.5, 0) - Top
             |
(0,0.5) ---[Shape]--- (1, 0.5)
             |
        (0.5, 1) - Bottom
```

### Routing Rules

1. **No overlapping paths** - Use different anchor points
2. **Bidirectional** - Use opposite sides
3. **Always specify anchors** - `exitX`, `exitY`, `entryX`, `entryY`
4. **Route around obstacles** - Use waypoints with 20-30px clearance

## Validation Checklist

### Pre-Generation

- [ ] Identified diagram type
- [ ] Counted nodes and relationships
- [ ] Planned grid positions
- [ ] Identified edge crossing points

### Post-Generation

- [ ] Complete wrapper structure
- [ ] Root cells present (`id="0"` and `id="1"`)
- [ ] All IDs unique, starting from "2"
- [ ] All edges have valid source/target
- [ ] Special characters escaped
- [ ] Coordinates within bounds

## References

For detailed information, see:

- **Templates**: [references/templates.md](references/templates.md) - Flowchart, Architecture, Sequence, ER, Mind Map templates
- **Cloud Icons**: [references/cloud-icons.md](references/cloud-icons.md) - AWS, GCP, Azure, Kubernetes icons
- **Style Guide**: [references/style-guide.md](references/style-guide.md) - Colors, shapes, edges, text styles

## Scripts

Validation and repair tools in `scripts/` directory:

```bash
# Validate diagram
npx ts-node scripts/validate.ts ./drawio/diagram.drawio

# Repair diagram
npx ts-node scripts/repair.ts ./drawio/diagram.drawio
```
