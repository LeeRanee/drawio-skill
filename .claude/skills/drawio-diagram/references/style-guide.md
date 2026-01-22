# Style Guide

## Shape Styles

**Basic Rectangle:**
`style="rounded=0;whiteSpace=wrap;html=1;"`

**Rounded Rectangle:**
`style="rounded=1;whiteSpace=wrap;html=1;arcSize=20;"`

**Ellipse/Circle:**
`style="ellipse;whiteSpace=wrap;html=1;"`

**Diamond (Decision):**
`style="rhombus;whiteSpace=wrap;html=1;"`

**Cylinder (Database):**
`style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;"`

**Document:**
`style="shape=document;whiteSpace=wrap;html=1;boundedLbl=1;"`

**Parallelogram (I/O):**
`style="shape=parallelogram;perimeter=parallelogramPerimeter;whiteSpace=wrap;html=1;"`

## Color Palette

| Name | Fill Color | Stroke Color | Use Case |
|------|------------|--------------|----------|
| Professional Blue | `#dae8fc` | `#6c8ebf` | Default, process steps |
| Success Green | `#d5e8d4` | `#82b366` | Start, success states |
| Warning Orange | `#ffe6cc` | `#d79b00` | Warnings, attention |
| Error Red | `#f8cecc` | `#b85450` | End, errors |
| Neutral Gray | `#f5f5f5` | `#666666` | Secondary elements |
| Purple | `#e1d5e7` | `#9673a6` | Highlights |
| Yellow | `#fff2cc` | `#d6b656` | Decisions |

## Edge Styles

**Solid with Arrow:**
`style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=classic;"`

**Dashed:**
`style="edgeStyle=orthogonalEdgeStyle;rounded=1;dashed=1;endArrow=classic;"`

**Curved:**
`style="edgeStyle=orthogonalEdgeStyle;curved=1;endArrow=classic;"`

**Bidirectional:**
`style="edgeStyle=orthogonalEdgeStyle;startArrow=classic;endArrow=classic;"`

**No Arrow (Association):**
`style="edgeStyle=orthogonalEdgeStyle;endArrow=none;"`

## Text Styles

| Style | Attribute |
|-------|-----------|
| Bold | `fontStyle=1;` |
| Italic | `fontStyle=2;` |
| Bold + Italic | `fontStyle=3;` |
| Font Size | `fontSize=14;` |
| Alignment | `align=center;verticalAlign=middle;` |

## Edge Routing Attributes

| Attribute | Description | Values |
|-----------|-------------|--------|
| `exitX` | Source anchor X | 0 (left), 0.5 (center), 1 (right) |
| `exitY` | Source anchor Y | 0 (top), 0.5 (center), 1 (bottom) |
| `entryX` | Target anchor X | 0 (left), 0.5 (center), 1 (right) |
| `entryY` | Target anchor Y | 0 (top), 0.5 (center), 1 (bottom) |

## Edge Examples

**Left-to-right connection:**
`style="edgeStyle=orthogonalEdgeStyle;rounded=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;endArrow=classic;"`

**Top-to-bottom connection:**
`style="edgeStyle=orthogonalEdgeStyle;rounded=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;endArrow=classic;"`

**Bidirectional (no overlap):**
- Forward: `exitX=1;exitY=0.3;entryX=0;entryY=0.3;`
- Backward: `exitX=0;exitY=0.7;entryX=1;entryY=0.7;`
