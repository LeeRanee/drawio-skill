# Draw.io Tools

Optional enhancement utilities for the drawio-skill Claude Code Skill.

## Installation

```bash
npm install
npm run build
```

## Quick Start

### Validate a Diagram

```bash
npm run validate -- ./drawio/my-diagram.drawio
```

### Auto-Repair a Diagram

```bash
npm run repair -- ./drawio/my-diagram.drawio
```

### Programmatic Usage

```typescript
import { validateDrawioXML, repairDrawioXML } from './tools/dist/index.js';

const xml = `<mxfile>...</mxfile>`;

// Validate
const validation = validateDrawioXML(xml);
if (!validation.valid) {
  console.error(validation.error);
}

// Repair
const repair = repairDrawioXML(xml);
if (repair.repaired) {
  // Use repair.repairedXML
}
```

## Module Reference

### xml-validation.ts

**10+ Validation Rules:**
1. Complete wrapper structure (`<mxfile>`, `<diagram>`, `<mxGraphModel>`, `<root>`)
2. Root cells present (`id="0"` and `id="1"`)
3. Unique IDs (no duplicates)
4. Valid parent references (no orphaned cells)
5. Valid source/target for edges
6. Special character escaping
7. No nested mxCell elements
8. No duplicate structural attributes
9. Valid XML syntax
10. Proper tag matching

**Auto-Repair Features:**
- Add missing wrapper elements
- Escape special characters (`&`, `<`, `>`, `"`)
- Remove duplicate attributes
- Fix malformed tags
- Close unclosed tags
- Remove foreign (non-draw.io) tags

### diagram-operations.ts

**CRUD Operations:**
- `addCell(doc, cell)` - Add new shape/edge
- `updateCell(doc, cellId, updates)` - Modify existing cell
- `deleteCell(doc, cellId)` - Remove cell (cascade delete edges)

**Cascade Delete:**
Automatically removes connected edges when deleting a vertex.

### history.ts

**History Management:**
- `addHistory(sessionId, xml, svg)` - Save current state
- `getHistory(sessionId)` - View all states
- `getHistoryEntry(sessionId, index)` - Get specific version
- `clearHistory(sessionId)` - Clear history

## Testing

Validation script example:

```bash
# Should pass
npm run validate -- ./drawio/user-login-flow.drawio

# Create intentionally broken file
echo '<mxfile><diagram></mxfile>' > broken.drawio
npm run repair -- broken.drawio
```

## Dependencies

- **linkedom** (0.16.0) - Fast, lightweight DOM implementation
- **zod** (3.22.0) - TypeScript-first schema validation

Both are:
- Actively maintained
- Zero sub-dependencies that could cause conflicts
- MIT licensed

## Examples

### Validate Before Git Commit

```bash
#!/bin/bash
for file in drawio/*.drawio; do
  npm run validate -- "$file" || exit 1
done
```

### CI/CD Integration

```yaml
# .github/workflows/validate-diagrams.yml
name: Validate Diagrams

on: [push, pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - name: Validate all diagrams
        run: |
          for file in drawio/*.drawio; do
            npm run validate -- "$file"
          done
```

## Troubleshooting

### "DOMParser is not defined"

Make sure to import from the compiled dist:

```typescript
import { validateDrawioXML } from './tools/dist/index.js';
```

Not from the source:

```typescript
// ❌ Don't do this
import { validateDrawioXML } from './tools/src/index.ts';
```

### "Module not found"

Run `npm run build` to compile TypeScript to JavaScript first.

## License

MIT
