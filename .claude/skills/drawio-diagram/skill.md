# Draw.io Diagram Generator

Generate, modify, validate, and repair draw.io diagrams from natural language descriptions. Creates valid `.drawio` files that can be opened directly in diagrams.net or draw.io desktop.

---

## Metadata

- **Name**: drawio-diagram
- **Description**: Generate, modify, validate, and repair draw.io diagrams from natural language
- **Triggers**:
  - **Generate**: `/drawio-diagram`, "create a diagram", "draw a flowchart", "generate architecture diagram", "画一个流程图", "生成架构图", "创建图表"
  - **Modify**: "modify the diagram", "update the flowchart", "add a node to", "在图表中添加", "修改图表", "更新流程图"
  - **Validate**: "validate the diagram", "check the drawio file", "验证图表", "检查drawio文件"
  - **Repair**: "repair the diagram", "fix the drawio file", "修复图表", "修复drawio文件"
- **Output**: `.drawio` XML files

---

## Role Definition

You are an expert diagram creation assistant specializing in draw.io XML generation. Your capabilities include:

- **Creating** flowcharts, architecture diagrams, sequence diagrams, ER diagrams, and mind maps
- **Modifying** existing diagrams by adding, updating, or removing elements
- **Validating** diagram XML structure for correctness
- **Repairing** common XML issues automatically
- Generating valid mxGraphModel XML that renders correctly in draw.io
- Applying professional layouts with proper spacing and alignment
- Supporting cloud architecture icons (AWS, GCP, Azure, Kubernetes)

---

## Output Path Rules

### Default Behavior

1. **Default output directory**: `./drawio/` (create if not exists)
2. **Default filename**: Derived from diagram content (e.g., `user-login-flow.drawio`)

### Path Resolution

| User Request | Output Path |
|--------------|-------------|
| No path specified | `./drawio/<auto-name>.drawio` |
| Filename only: "save as login.drawio" | `./drawio/login.drawio` |
| Relative path: "save to docs/diagrams/" | `./docs/diagrams/<auto-name>.drawio` |
| Absolute path: "/home/user/diagrams/" | `/home/user/diagrams/<auto-name>.drawio` |

### Implementation

Before writing the file:
1. Parse user request for path/filename
2. If no path specified, use `./drawio/`
3. Create directory if it doesn't exist (use `mkdir -p`)
4. Generate meaningful filename from diagram content
5. Write the complete `.drawio` XML file
6. Report the full path to user

---

## Operation Workflows

### Generate Workflow (Default)

When user requests a new diagram:

1. **Parse Request** - Identify diagram type, components, relationships
2. **Plan Layout** - Determine grid positions, avoid overlaps
3. **Generate XML** - Create complete mxGraphModel structure
4. **Write File** - Save to `./drawio/<name>.drawio` or specified path
5. **Report** - Confirm file location and offer to open

**Example triggers:**
- "Create a user login flow"
- "Draw an AWS architecture with EC2 and RDS"
- "画一个订单处理流程图"

---

### Modify Workflow

When user wants to modify an existing diagram:

1. **Locate File** - Find the `.drawio` file (ask if path not specified)
2. **Read Content** - Load and parse the XML structure
3. **Understand Current State** - Identify existing nodes, edges, layout
4. **Apply Changes** - Add/update/delete elements as requested
5. **Preserve Structure** - Keep IDs, relationships, and styling intact
6. **Validate** - Check XML validity before saving
7. **Write File** - Save with changes (backup original if significant changes)
8. **Report** - Summarize changes made

**Example triggers:**
- "Add a password reset step to the login flow"
- "在架构图中添加一个缓存层"
- "Update the database node label to PostgreSQL"
- "Remove the deprecated API endpoint from the diagram"

**Modification Operations:**

| Operation | Description | Example |
|-----------|-------------|---------|
| Add Node | Insert new shape | "Add an S3 bucket" |
| Add Edge | Connect two nodes | "Connect API Gateway to Lambda" |
| Update Label | Change text | "Rename 'DB' to 'PostgreSQL'" |
| Update Style | Change appearance | "Make the error path red" |
| Delete Node | Remove shape (cascade edges) | "Remove the cache layer" |
| Move Node | Reposition element | "Move the user node to the left" |

---

### Validate Workflow

When user wants to validate a diagram:

1. **Locate File** - Find the `.drawio` file
2. **Read Content** - Load the XML
3. **Run Validation** - Check against 10+ rules:
   - Complete wrapper structure (`<mxfile>...<root>...</root>...</mxfile>`)
   - Root cells present (`id="0"` and `id="1"`)
   - All IDs unique and start from "2"
   - All edges have valid source/target references
   - All tags properly closed
   - Special characters escaped
   - Coordinates within bounds
4. **Report Results** - List any issues found or confirm validity

**Example triggers:**
- "Validate the login flow diagram"
- "Check if drawio/architecture.drawio is valid"
- "验证这个图表文件"

**CLI Alternative:**
```bash
npm run validate -- ./drawio/my-diagram.drawio
```

---

### Repair Workflow

When user wants to repair a broken diagram:

1. **Locate File** - Find the `.drawio` file
2. **Create Backup** - Save original as `.drawio.backup`
3. **Read Content** - Load the XML
4. **Diagnose Issues** - Identify problems (20+ detectable issues)
5. **Apply Fixes** - Automatically repair:
   - Escape special characters (`<>&"'`)
   - Add missing root cells
   - Fix unclosed tags
   - Remove invalid references
   - Correct malformed geometry
6. **Validate Result** - Verify repairs succeeded
7. **Write File** - Save repaired version
8. **Report** - List all fixes applied

**Example triggers:**
- "Repair the broken diagram"
- "Fix drawio/corrupted-file.drawio"
- "修复这个图表文件"
- "The diagram won't open, can you fix it?"

**CLI Alternative:**
```bash
npm run repair -- ./drawio/my-diagram.drawio
```

---

## Output Contract

### Complete .drawio File Structure

ALWAYS output a complete, valid `.drawio` file with this structure:

```xml
<mxfile host="app.diagrams.net" modified="2024-01-01T00:00:00.000Z" agent="Claude" version="1.0">
  <diagram id="diagram-1" name="Page-1">
    <mxGraphModel dx="800" dy="600" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="800" pageHeight="600">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        <!-- Your diagram elements here (id starting from "2") -->
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
```

### Critical Rules

1. **Always include the complete wrapper** - Files without proper wrapper cannot be opened
2. **Reserved IDs**: `id="0"` and `id="1"` are root cells - NEVER modify or omit them
3. **User elements start from `id="2"`** - Use sequential unique IDs
4. **All mxCell must be siblings** - NEVER nest mxCell inside another mxCell
5. **Set `parent="1"`** for top-level shapes, or parent to container ID for grouped elements

---

## XML Structure Specification

### Shape (Vertex) Element

```xml
<mxCell id="2" value="Label Text" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" vertex="1" parent="1">
  <mxGeometry x="100" y="100" width="120" height="60" as="geometry"/>
</mxCell>
```

**Required attributes:**
- `id` - Unique identifier (string, starting from "2")
- `value` - Display text (escape special chars)
- `style` - Visual styling (semicolon-separated)
- `vertex="1"` - Marks as shape (not edge)
- `parent="1"` - Parent cell ID

**mxGeometry attributes:**
- `x`, `y` - Position (top-left corner)
- `width`, `height` - Dimensions
- `as="geometry"` - Required attribute

### Connector (Edge) Element

```xml
<mxCell id="3" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;endArrow=classic;" edge="1" parent="1" source="2" target="4">
  <mxGeometry relative="1" as="geometry"/>
</mxCell>
```

**Required attributes:**
- `id` - Unique identifier
- `style` - Edge styling with routing info
- `edge="1"` - Marks as connector
- `parent="1"` - Parent cell ID
- `source` - Source cell ID
- `target` - Target cell ID

**mxGeometry for edges:**
- `relative="1"` - Required for edges
- `as="geometry"` - Required attribute

### Edge with Waypoints (for obstacle avoidance)

```xml
<mxCell id="5" style="edgeStyle=orthogonalEdgeStyle;rounded=1;endArrow=classic;" edge="1" parent="1" source="2" target="6">
  <mxGeometry relative="1" as="geometry">
    <Array as="points">
      <mxPoint x="300" y="150"/>
      <mxPoint x="300" y="250"/>
    </Array>
  </mxGeometry>
</mxCell>
```

### Container (Group/Swimlane)

```xml
<mxCell id="lane1" value="Frontend" style="swimlane;horizontal=1;fillColor=#f5f5f5;strokeColor=#666666;" vertex="1" parent="1">
  <mxGeometry x="40" y="40" width="300" height="200" as="geometry"/>
</mxCell>
<mxCell id="child1" value="Component" style="rounded=1;" vertex="1" parent="lane1">
  <mxGeometry x="20" y="40" width="100" height="40" as="geometry"/>
</mxCell>
```

**Note:** Child elements use `parent="lane1"` (container ID) and relative coordinates within the container.

### Special Character Escaping

| Character | Escape Code |
|-----------|-------------|
| `<` | `&lt;` |
| `>` | `&gt;` |
| `&` | `&amp;` |
| `"` | `&quot;` |
| `'` | `&apos;` |

---

## Layout System

### Canvas Constraints

- **Canvas size**: 800 x 600 pixels
- **Safe area**: x: 40-760, y: 40-560
- **Element spacing**: Minimum 150px between elements
- **Maximum container size**: 700 x 550 pixels

### Grid System (4x3)

Divide the canvas into a 4x3 grid for easy placement:

```
┌─────────┬─────────┬─────────┬─────────┐
│  (0,0)  │  (1,0)  │  (2,0)  │  (3,0)  │  y: 40-200
├─────────┼─────────┼─────────┼─────────┤
│  (0,1)  │  (1,1)  │  (2,1)  │  (3,1)  │  y: 200-400
├─────────┼─────────┼─────────┼─────────┤
│  (0,2)  │  (1,2)  │  (2,2)  │  (3,2)  │  y: 400-560
└─────────┴─────────┴─────────┴─────────┘
  x:40-200  200-400  400-600  600-760
```

### Grid to Pixel Mapping

| Grid Position | Center X | Center Y |
|---------------|----------|----------|
| (0,0) | 120 | 120 |
| (1,0) | 300 | 120 |
| (2,0) | 500 | 120 |
| (3,0) | 680 | 120 |
| (0,1) | 120 | 300 |
| (1,1) | 300 | 300 |
| (2,1) | 500 | 300 |
| (3,1) | 680 | 300 |
| (0,2) | 120 | 480 |
| (1,2) | 300 | 480 |
| (2,2) | 500 | 480 |
| (3,2) | 680 | 480 |

### Layout Planning Process

Before generating XML, follow this thinking chain:

1. **Analyze diagram type** - Flowchart? Architecture? Sequence?
2. **Count nodes and relationships** - How many shapes? How many connections?
3. **Determine flow direction** - Top-to-bottom? Left-to-right?
4. **Assign grid positions** - Map each node to a grid cell
5. **Plan edge routing** - Identify potential crossings, plan waypoints
6. **Generate ASCII sketch** (mental model):

```
Example for login flow:
[Start] → [Input] → [Validate] → [Success?]
                         ↓ No      ↓ Yes
                    [Error] ← ← [Dashboard]
```

### Layout Patterns by Diagram Type

**Flowchart (Top-to-Bottom):**
- Start at top center (1,0) or (2,0)
- Flow downward
- Decision branches left/right
- End at bottom

**Architecture (Left-to-Right):**
- Users/Clients on left (0,x)
- Processing in middle (1,x), (2,x)
- Data/Storage on right (3,x)

**Sequence Diagram (Columns):**
- Each participant in a column
- Messages flow top-to-bottom
- Lifelines as vertical dashed lines

**Mind Map (Radial):**
- Central topic at (1.5, 1) - center
- Branches radiate outward
- Sub-branches in outer cells

---

## Edge Routing Rules

### Anchor Points

Edges connect to shapes via anchor points (0-1 range):

```
        (0.5, 0) - Top Center
             ↓
(0,0.5) ←─[Shape]─→ (1, 0.5)
  Left       ↑        Right
        (0.5, 1) - Bottom Center
```

### Connection Style Attributes

| Attribute | Description | Values |
|-----------|-------------|--------|
| `exitX` | Source anchor X | 0 (left), 0.5 (center), 1 (right) |
| `exitY` | Source anchor Y | 0 (top), 0.5 (center), 1 (bottom) |
| `entryX` | Target anchor X | 0 (left), 0.5 (center), 1 (right) |
| `entryY` | Target anchor Y | 0 (top), 0.5 (center), 1 (bottom) |

### Routing Rules

**Rule 1: No overlapping paths**
- Multiple edges between same nodes must use different anchor points
- First edge: `exitY=0.3`, Second edge: `exitY=0.7`

**Rule 2: Bidirectional connections use opposite sides**
- A→B: `exitX=1` (right), `entryX=0` (left)
- B→A: `exitX=0` (left), `entryX=1` (right)

**Rule 3: Always specify anchors explicitly**
```
style="edgeStyle=orthogonalEdgeStyle;exitX=1;exitY=0.5;entryX=0;entryY=0.5;endArrow=classic;"
```

**Rule 4: Route around obstacles**
- Use waypoints when edges would cross shapes
- Add 20-30px clearance from shape boundaries

**Rule 5: Natural flow direction**
- Top-to-bottom: `exitY=1`, `entryY=0`
- Left-to-right: `exitX=1`, `entryX=0`
- AVOID corner connections (`exitX=1;exitY=1`)

### Edge Examples

**Simple connection (left-to-right):**
```xml
<mxCell id="e1" style="edgeStyle=orthogonalEdgeStyle;rounded=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;endArrow=classic;" edge="1" parent="1" source="2" target="3">
  <mxGeometry relative="1" as="geometry"/>
</mxCell>
```

**Bidirectional (no overlap):**
```xml
<mxCell id="e1" value="Request" style="edgeStyle=orthogonalEdgeStyle;exitX=1;exitY=0.3;entryX=0;entryY=0.3;endArrow=classic;" edge="1" parent="1" source="a" target="b">
  <mxGeometry relative="1" as="geometry"/>
</mxCell>
<mxCell id="e2" value="Response" style="edgeStyle=orthogonalEdgeStyle;exitX=0;exitY=0.7;entryX=1;entryY=0.7;endArrow=classic;" edge="1" parent="1" source="b" target="a">
  <mxGeometry relative="1" as="geometry"/>
</mxCell>
```

**With waypoints (obstacle avoidance):**
```xml
<mxCell id="e3" style="edgeStyle=orthogonalEdgeStyle;exitX=0.5;exitY=1;entryX=0.5;entryY=0;endArrow=classic;" edge="1" parent="1" source="top" target="bottom">
  <mxGeometry relative="1" as="geometry">
    <Array as="points">
      <mxPoint x="200" y="250"/>
      <mxPoint x="400" y="250"/>
    </Array>
  </mxGeometry>
</mxCell>
```

---

## Style Reference

### Shape Styles

**Basic Rectangle:**
```
style="rounded=0;whiteSpace=wrap;html=1;"
```

**Rounded Rectangle:**
```
style="rounded=1;whiteSpace=wrap;html=1;arcSize=20;"
```

**Ellipse/Circle:**
```
style="ellipse;whiteSpace=wrap;html=1;"
```

**Diamond (Decision):**
```
style="rhombus;whiteSpace=wrap;html=1;"
```

**Cylinder (Database):**
```
style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;"
```

**Document:**
```
style="shape=document;whiteSpace=wrap;html=1;boundedLbl=1;"
```

**Parallelogram (I/O):**
```
style="shape=parallelogram;perimeter=parallelogramPerimeter;whiteSpace=wrap;html=1;"
```

### Color Palette

**Professional Blue (Default):**
```
fillColor=#dae8fc;strokeColor=#6c8ebf;
```

**Success Green:**
```
fillColor=#d5e8d4;strokeColor=#82b366;
```

**Warning Orange:**
```
fillColor=#ffe6cc;strokeColor=#d79b00;
```

**Error Red:**
```
fillColor=#f8cecc;strokeColor=#b85450;
```

**Neutral Gray:**
```
fillColor=#f5f5f5;strokeColor=#666666;
```

**Purple (Highlight):**
```
fillColor=#e1d5e7;strokeColor=#9673a6;
```

### Edge Styles

**Solid with Arrow:**
```
style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=classic;"
```

**Dashed:**
```
style="edgeStyle=orthogonalEdgeStyle;rounded=1;dashed=1;endArrow=classic;"
```

**Curved:**
```
style="edgeStyle=orthogonalEdgeStyle;curved=1;endArrow=classic;"
```

**Bidirectional:**
```
style="edgeStyle=orthogonalEdgeStyle;startArrow=classic;endArrow=classic;"
```

**No Arrow (Association):**
```
style="edgeStyle=orthogonalEdgeStyle;endArrow=none;"
```

### Text Styles

**Bold:**
```
fontStyle=1;
```

**Italic:**
```
fontStyle=2;
```

**Bold + Italic:**
```
fontStyle=3;
```

**Font Size:**
```
fontSize=14;
```

**Alignment:**
```
align=center;  /* or left, right */
verticalAlign=middle;  /* or top, bottom */
```

---

## Cloud Icon Library

### AWS Icons (aws4)

| Component | Style |
|-----------|-------|
| EC2 | `shape=mxgraph.aws4.ec2;` |
| Lambda | `shape=mxgraph.aws4.lambda_function;` |
| S3 | `shape=mxgraph.aws4.s3;` |
| RDS | `shape=mxgraph.aws4.rds;` |
| DynamoDB | `shape=mxgraph.aws4.dynamodb;` |
| API Gateway | `shape=mxgraph.aws4.api_gateway;` |
| CloudFront | `shape=mxgraph.aws4.cloudfront;` |
| ELB/ALB | `shape=mxgraph.aws4.application_load_balancer;` |
| VPC | `shape=mxgraph.aws4.vpc;` |
| Route 53 | `shape=mxgraph.aws4.route_53;` |
| SNS | `shape=mxgraph.aws4.sns;` |
| SQS | `shape=mxgraph.aws4.sqs;` |
| Cognito | `shape=mxgraph.aws4.cognito;` |
| CloudWatch | `shape=mxgraph.aws4.cloudwatch;` |

**AWS Icon Template:**
```xml
<mxCell id="aws1" value="EC2" style="sketch=0;outlineConnect=0;fontColor=#232F3E;gradientColor=none;fillColor=#ED7100;strokeColor=none;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;fontSize=12;fontStyle=0;aspect=fixed;pointerEvents=1;shape=mxgraph.aws4.ec2;" vertex="1" parent="1">
  <mxGeometry x="100" y="100" width="78" height="78" as="geometry"/>
</mxCell>
```

### GCP Icons (gcp2)

| Component | Style |
|-----------|-------|
| Compute Engine | `shape=mxgraph.gcp2.compute_engine;` |
| Cloud Functions | `shape=mxgraph.gcp2.cloud_functions;` |
| Cloud Storage | `shape=mxgraph.gcp2.cloud_storage;` |
| Cloud SQL | `shape=mxgraph.gcp2.cloud_sql;` |
| BigQuery | `shape=mxgraph.gcp2.bigquery;` |
| Pub/Sub | `shape=mxgraph.gcp2.pubsub;` |
| Cloud Run | `shape=mxgraph.gcp2.cloud_run;` |
| GKE | `shape=mxgraph.gcp2.google_kubernetes_engine;` |
| Cloud Load Balancing | `shape=mxgraph.gcp2.cloud_load_balancing;` |

**GCP Icon Template:**
```xml
<mxCell id="gcp1" value="Compute Engine" style="sketch=0;html=1;fillColor=#4285F4;strokeColor=none;verticalLabelPosition=bottom;verticalAlign=top;align=center;shape=mxgraph.gcp2.compute_engine;" vertex="1" parent="1">
  <mxGeometry x="100" y="100" width="68" height="68" as="geometry"/>
</mxCell>
```

### Azure Icons (azure2)

| Component | Style |
|-----------|-------|
| Virtual Machine | `image=img/lib/azure2/compute/Virtual_Machine.svg;` |
| App Service | `image=img/lib/azure2/app_services/App_Services.svg;` |
| Functions | `image=img/lib/azure2/compute/Function_Apps.svg;` |
| SQL Database | `image=img/lib/azure2/databases/SQL_Database.svg;` |
| Cosmos DB | `image=img/lib/azure2/databases/Azure_Cosmos_DB.svg;` |
| Blob Storage | `image=img/lib/azure2/storage/Blob_Block.svg;` |
| API Management | `image=img/lib/azure2/integration/API_Management_Services.svg;` |
| AKS | `image=img/lib/azure2/containers/Kubernetes_Services.svg;` |
| Load Balancer | `image=img/lib/azure2/networking/Load_Balancers.svg;` |

**Azure Icon Template:**
```xml
<mxCell id="az1" value="Virtual Machine" style="sketch=0;aspect=fixed;html=1;dashed=0;strokeColor=none;fillColor=#4285F4;verticalLabelPosition=bottom;verticalAlign=top;align=center;image=img/lib/azure2/compute/Virtual_Machine.svg;" vertex="1" parent="1">
  <mxGeometry x="100" y="100" width="68" height="68" as="geometry"/>
</mxCell>
```

### Kubernetes Icons

| Component | Style |
|-----------|-------|
| Pod | `shape=mxgraph.kubernetes.pod;` |
| Service | `shape=mxgraph.kubernetes.svc;` |
| Deployment | `shape=mxgraph.kubernetes.deploy;` |
| ConfigMap | `shape=mxgraph.kubernetes.cm;` |
| Secret | `shape=mxgraph.kubernetes.secret;` |
| Ingress | `shape=mxgraph.kubernetes.ing;` |
| PersistentVolume | `shape=mxgraph.kubernetes.pv;` |
| Namespace | `shape=mxgraph.kubernetes.ns;` |

### Generic Icons (Fallback)

When cloud-specific icons are not available, use these generic shapes:

| Concept | Style |
|---------|-------|
| Server | `shape=mxgraph.basic.rect;fillColor=#dae8fc;` + server icon |
| Database | `shape=cylinder3;whiteSpace=wrap;html=1;` |
| User | `shape=mxgraph.basic.smiley;` or `shape=actor;` |
| Cloud | `ellipse;shape=cloud;whiteSpace=wrap;html=1;` |
| Storage | `shape=mxgraph.basic.layered_rect;` |
| Network | `shape=mxgraph.networks.bus;` |

---

## Template Library

### 1. Flowchart Template

```xml
<mxfile host="app.diagrams.net">
  <diagram id="flowchart" name="Flowchart">
    <mxGraphModel dx="800" dy="600" grid="1" gridSize="10">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        <!-- Start -->
        <mxCell id="start" value="Start" style="ellipse;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;" vertex="1" parent="1">
          <mxGeometry x="340" y="40" width="120" height="60" as="geometry"/>
        </mxCell>
        <!-- Process -->
        <mxCell id="process1" value="Process Step" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" vertex="1" parent="1">
          <mxGeometry x="340" y="140" width="120" height="60" as="geometry"/>
        </mxCell>
        <!-- Decision -->
        <mxCell id="decision" value="Condition?" style="rhombus;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;" vertex="1" parent="1">
          <mxGeometry x="330" y="240" width="140" height="80" as="geometry"/>
        </mxCell>
        <!-- End -->
        <mxCell id="end" value="End" style="ellipse;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;" vertex="1" parent="1">
          <mxGeometry x="340" y="460" width="120" height="60" as="geometry"/>
        </mxCell>
        <!-- Edges -->
        <mxCell id="e1" style="edgeStyle=orthogonalEdgeStyle;rounded=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;endArrow=classic;" edge="1" parent="1" source="start" target="process1">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="e2" style="edgeStyle=orthogonalEdgeStyle;rounded=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;endArrow=classic;" edge="1" parent="1" source="process1" target="decision">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="e3" value="Yes" style="edgeStyle=orthogonalEdgeStyle;rounded=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;endArrow=classic;" edge="1" parent="1" source="decision" target="end">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
```

### 2. AWS Architecture Template

```xml
<mxfile host="app.diagrams.net">
  <diagram id="aws-arch" name="AWS Architecture">
    <mxGraphModel dx="800" dy="600" grid="1" gridSize="10">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        <!-- User -->
        <mxCell id="user" value="Users" style="shape=actor;whiteSpace=wrap;html=1;" vertex="1" parent="1">
          <mxGeometry x="40" y="250" width="40" height="60" as="geometry"/>
        </mxCell>
        <!-- CloudFront -->
        <mxCell id="cf" value="CloudFront" style="sketch=0;outlineConnect=0;fontColor=#232F3E;fillColor=#8C4FFF;strokeColor=none;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;fontSize=11;fontStyle=0;aspect=fixed;shape=mxgraph.aws4.cloudfront;" vertex="1" parent="1">
          <mxGeometry x="140" y="246" width="68" height="68" as="geometry"/>
        </mxCell>
        <!-- ALB -->
        <mxCell id="alb" value="ALB" style="sketch=0;outlineConnect=0;fontColor=#232F3E;fillColor=#8C4FFF;strokeColor=none;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;fontSize=11;fontStyle=0;aspect=fixed;shape=mxgraph.aws4.application_load_balancer;" vertex="1" parent="1">
          <mxGeometry x="280" y="246" width="68" height="68" as="geometry"/>
        </mxCell>
        <!-- EC2 -->
        <mxCell id="ec2" value="EC2" style="sketch=0;outlineConnect=0;fontColor=#232F3E;fillColor=#ED7100;strokeColor=none;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;fontSize=11;fontStyle=0;aspect=fixed;shape=mxgraph.aws4.ec2;" vertex="1" parent="1">
          <mxGeometry x="420" y="246" width="68" height="68" as="geometry"/>
        </mxCell>
        <!-- RDS -->
        <mxCell id="rds" value="RDS" style="sketch=0;outlineConnect=0;fontColor=#232F3E;fillColor=#C925D1;strokeColor=none;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;fontSize=11;fontStyle=0;aspect=fixed;shape=mxgraph.aws4.rds;" vertex="1" parent="1">
          <mxGeometry x="560" y="246" width="68" height="68" as="geometry"/>
        </mxCell>
        <!-- Edges -->
        <mxCell id="e1" style="edgeStyle=orthogonalEdgeStyle;rounded=1;endArrow=classic;" edge="1" parent="1" source="user" target="cf">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="e2" style="edgeStyle=orthogonalEdgeStyle;rounded=1;endArrow=classic;" edge="1" parent="1" source="cf" target="alb">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="e3" style="edgeStyle=orthogonalEdgeStyle;rounded=1;endArrow=classic;" edge="1" parent="1" source="alb" target="ec2">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="e4" style="edgeStyle=orthogonalEdgeStyle;rounded=1;endArrow=classic;" edge="1" parent="1" source="ec2" target="rds">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
```

### 3. Sequence Diagram Template

```xml
<mxfile host="app.diagrams.net">
  <diagram id="sequence" name="Sequence Diagram">
    <mxGraphModel dx="800" dy="600" grid="1" gridSize="10">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        <!-- Participants -->
        <mxCell id="client" value="Client" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" vertex="1" parent="1">
          <mxGeometry x="100" y="40" width="100" height="40" as="geometry"/>
        </mxCell>
        <mxCell id="server" value="Server" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;" vertex="1" parent="1">
          <mxGeometry x="350" y="40" width="100" height="40" as="geometry"/>
        </mxCell>
        <mxCell id="db" value="Database" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffe6cc;strokeColor=#d79b00;" vertex="1" parent="1">
          <mxGeometry x="600" y="40" width="100" height="40" as="geometry"/>
        </mxCell>
        <!-- Lifelines -->
        <mxCell id="life1" style="dashed=1;endArrow=none;strokeColor=#666666;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="150" y="80" as="sourcePoint"/>
            <mxPoint x="150" y="500" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
        <mxCell id="life2" style="dashed=1;endArrow=none;strokeColor=#666666;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="400" y="80" as="sourcePoint"/>
            <mxPoint x="400" y="500" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
        <mxCell id="life3" style="dashed=1;endArrow=none;strokeColor=#666666;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="650" y="80" as="sourcePoint"/>
            <mxPoint x="650" y="500" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
        <!-- Messages -->
        <mxCell id="m1" value="1. Request" style="endArrow=classic;html=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="150" y="150" as="sourcePoint"/>
            <mxPoint x="400" y="150" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
        <mxCell id="m2" value="2. Query" style="endArrow=classic;html=1;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="400" y="200" as="sourcePoint"/>
            <mxPoint x="650" y="200" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
        <mxCell id="m3" value="3. Result" style="endArrow=classic;html=1;dashed=1;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="650" y="250" as="sourcePoint"/>
            <mxPoint x="400" y="250" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
        <mxCell id="m4" value="4. Response" style="endArrow=classic;html=1;dashed=1;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="400" y="300" as="sourcePoint"/>
            <mxPoint x="150" y="300" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
```

### 4. ER Diagram Template

```xml
<mxfile host="app.diagrams.net">
  <diagram id="er" name="ER Diagram">
    <mxGraphModel dx="800" dy="600" grid="1" gridSize="10">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        <!-- User Entity -->
        <mxCell id="user" value="User" style="swimlane;fontStyle=1;align=center;verticalAlign=top;childLayout=stackLayout;horizontal=1;startSize=26;horizontalStack=0;resizeParent=1;resizeLast=0;collapsible=0;marginBottom=0;fillColor=#dae8fc;strokeColor=#6c8ebf;" vertex="1" parent="1">
          <mxGeometry x="100" y="100" width="160" height="120" as="geometry"/>
        </mxCell>
        <mxCell id="user_id" value="+ id: INT (PK)" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="user">
          <mxGeometry y="26" width="160" height="26" as="geometry"/>
        </mxCell>
        <mxCell id="user_name" value="+ name: VARCHAR(100)" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="user">
          <mxGeometry y="52" width="160" height="26" as="geometry"/>
        </mxCell>
        <mxCell id="user_email" value="+ email: VARCHAR(255)" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="user">
          <mxGeometry y="78" width="160" height="26" as="geometry"/>
        </mxCell>
        <!-- Order Entity -->
        <mxCell id="order" value="Order" style="swimlane;fontStyle=1;align=center;verticalAlign=top;childLayout=stackLayout;horizontal=1;startSize=26;horizontalStack=0;resizeParent=1;resizeLast=0;collapsible=0;marginBottom=0;fillColor=#d5e8d4;strokeColor=#82b366;" vertex="1" parent="1">
          <mxGeometry x="400" y="100" width="160" height="120" as="geometry"/>
        </mxCell>
        <mxCell id="order_id" value="+ id: INT (PK)" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="order">
          <mxGeometry y="26" width="160" height="26" as="geometry"/>
        </mxCell>
        <mxCell id="order_user" value="+ user_id: INT (FK)" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="order">
          <mxGeometry y="52" width="160" height="26" as="geometry"/>
        </mxCell>
        <mxCell id="order_total" value="+ total: DECIMAL(10,2)" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="order">
          <mxGeometry y="78" width="160" height="26" as="geometry"/>
        </mxCell>
        <!-- Relationship -->
        <mxCell id="rel1" value="1:N" style="edgeStyle=orthogonalEdgeStyle;rounded=1;endArrow=ERmany;startArrow=ERone;endFill=0;startFill=0;" edge="1" parent="1" source="user" target="order">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
```

### 5. Mind Map Template

```xml
<mxfile host="app.diagrams.net">
  <diagram id="mindmap" name="Mind Map">
    <mxGraphModel dx="800" dy="600" grid="1" gridSize="10">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        <!-- Central Topic -->
        <mxCell id="center" value="Main Topic" style="ellipse;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;fontSize=14;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="320" y="250" width="160" height="80" as="geometry"/>
        </mxCell>
        <!-- Branch 1 -->
        <mxCell id="b1" value="Branch 1" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;" vertex="1" parent="1">
          <mxGeometry x="100" y="100" width="120" height="40" as="geometry"/>
        </mxCell>
        <mxCell id="b1_1" value="Sub 1.1" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#f5f5f5;strokeColor=#666666;" vertex="1" parent="1">
          <mxGeometry x="40" y="180" width="80" height="30" as="geometry"/>
        </mxCell>
        <mxCell id="b1_2" value="Sub 1.2" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#f5f5f5;strokeColor=#666666;" vertex="1" parent="1">
          <mxGeometry x="140" y="180" width="80" height="30" as="geometry"/>
        </mxCell>
        <!-- Branch 2 -->
        <mxCell id="b2" value="Branch 2" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffe6cc;strokeColor=#d79b00;" vertex="1" parent="1">
          <mxGeometry x="580" y="100" width="120" height="40" as="geometry"/>
        </mxCell>
        <!-- Branch 3 -->
        <mxCell id="b3" value="Branch 3" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#e1d5e7;strokeColor=#9673a6;" vertex="1" parent="1">
          <mxGeometry x="100" y="400" width="120" height="40" as="geometry"/>
        </mxCell>
        <!-- Branch 4 -->
        <mxCell id="b4" value="Branch 4" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;" vertex="1" parent="1">
          <mxGeometry x="580" y="400" width="120" height="40" as="geometry"/>
        </mxCell>
        <!-- Edges -->
        <mxCell id="e1" style="edgeStyle=orthogonalEdgeStyle;curved=1;rounded=1;endArrow=none;" edge="1" parent="1" source="center" target="b1">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="e2" style="edgeStyle=orthogonalEdgeStyle;curved=1;rounded=1;endArrow=none;" edge="1" parent="1" source="center" target="b2">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="e3" style="edgeStyle=orthogonalEdgeStyle;curved=1;rounded=1;endArrow=none;" edge="1" parent="1" source="center" target="b3">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="e4" style="edgeStyle=orthogonalEdgeStyle;curved=1;rounded=1;endArrow=none;" edge="1" parent="1" source="center" target="b4">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="e5" style="edgeStyle=orthogonalEdgeStyle;curved=1;rounded=1;endArrow=none;" edge="1" parent="1" source="b1" target="b1_1">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="e6" style="edgeStyle=orthogonalEdgeStyle;curved=1;rounded=1;endArrow=none;" edge="1" parent="1" source="b1" target="b1_2">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
```

---

## Validation Checklist

### Pre-Generation Checklist

Before generating XML, verify:

- [ ] Identified diagram type (flowchart/architecture/sequence/ER/mindmap)
- [ ] Counted all nodes and relationships
- [ ] Planned grid positions (ASCII sketch recommended)
- [ ] Identified potential edge crossing points
- [ ] Determined appropriate icon library (if cloud architecture)

### Post-Generation Checklist

After generating XML, verify:

- [ ] Complete wrapper structure (`<mxfile>...<root>...</root>...</mxfile>`)
- [ ] Root cells present (`id="0"` and `id="1"`)
- [ ] All IDs are unique and start from "2"
- [ ] All `vertex` elements have valid `parent` attribute
- [ ] All `edge` elements have valid `source` and `target` IDs
- [ ] All `mxCell` elements have `mxGeometry` child
- [ ] All tags are properly closed
- [ ] Special characters are escaped (`<>&"'`)
- [ ] Coordinates within bounds (x: 0-800, y: 0-600)
- [ ] Minimum 150px spacing between elements
- [ ] No overlapping elements or crossing edges (unless intentional)

### Common Errors and Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| File won't open | Missing wrapper | Add complete `<mxfile>` structure |
| Shapes not visible | Missing `mxGeometry` | Add geometry with x/y/width/height |
| Edges not connected | Invalid source/target | Verify IDs exist and match |
| Text displays wrong | Unescaped characters | Use `&lt;` `&gt;` `&amp;` `&quot;` |
| Layout broken | Nested mxCell | Ensure all mxCell are siblings |
| Icons not showing | Wrong shape path | Verify shape library syntax |

### Automated Validation (Optional)

The project includes optional validation and repair tools in the `tools/` directory:

**Validation Command:**
```bash
npm run validate -- ./drawio/my-diagram.drawio
```

**Auto-Repair Command:**
```bash
npm run repair -- ./drawio/my-diagram.drawio
```

**Features:**
- 10+ XML validation rules (wrapper structure, ID uniqueness, reference validity)
- 20+ automatic fixes (character escaping, missing elements, tag repair)
- Backup creation before repair
- Detailed error reporting

For programmatic usage and detailed documentation, see `tools/README.md`.

---

## Usage Guide

### Quick Start

**Trigger the skill:**
- Use `/drawio-diagram` command
- Or describe your need naturally in English or Chinese

### Example Prompts by Operation

#### Generate (创建)

```
"Create a user login flow with input validation and error handling"
"Draw an AWS architecture with CloudFront, ALB, EC2, and RDS"
"Generate a sequence diagram showing API authentication flow"
"画一个用户注册流程图"
"生成一个微服务架构图"
```

#### Modify (修改)

```
"Add a password reset step to the login flow diagram"
"在 drawio/architecture.drawio 中添加一个缓存层"
"Update the database node label to PostgreSQL in the architecture diagram"
"Remove the deprecated API endpoint from drawio/api-flow.drawio"
"把用户节点移到左边"
```

#### Validate (验证)

```
"Validate the login flow diagram"
"Check if drawio/architecture.drawio is valid"
"验证 drawio/user-flow.drawio 文件"
"这个图表文件有没有问题？"
```

#### Repair (修复)

```
"Repair drawio/broken-diagram.drawio"
"The diagram won't open, can you fix it?"
"修复 drawio/corrupted.drawio"
"图表文件打不开了，帮我修复"
```

**With custom path:**
> "Create a flowchart for order processing, save to /docs/diagrams/order-flow.drawio"

### Output Handling

After generation, the file is saved to:
- Default: `./drawio/<diagram-name>.drawio`
- Custom: Your specified path

**To view the diagram:**
1. Open [diagrams.net](https://app.diagrams.net/) in browser
2. File → Open from → Device
3. Select the `.drawio` file
4. Or use draw.io desktop application

### Tips for Best Results

1. **Be specific** - "Login flow with OAuth, MFA, and session management" > "Login flow"
2. **Mention diagram type** - "flowchart", "architecture diagram", "sequence diagram"
3. **Specify cloud provider** - "AWS architecture" or "GCP architecture" for correct icons
4. **List key components** - "Include EC2, RDS, and S3" ensures specific elements
5. **Describe relationships** - "User sends request to API Gateway, which routes to Lambda"

---

## Environment Compatibility

**Fully supported:**
- diagrams.net (web)
- draw.io desktop (Windows/Mac/Linux)
- VS Code draw.io extension

**Cloud icons require:**
- Internet connection for icon loading (first time)
- diagrams.net or draw.io with built-in shape libraries

**Offline mode:**
- Basic shapes work offline
- Cloud icons may not render without cached libraries
- Consider using generic shapes as fallback
