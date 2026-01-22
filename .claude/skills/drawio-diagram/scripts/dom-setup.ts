/**
 * DOM Setup for Node.js environment
 * Provides DOMParser polyfill using linkedom
 */

import { DOMParser, parseHTML } from 'linkedom';

// Setup global DOMParser for xml-validation.ts and diagram-operations.ts
if (typeof globalThis.DOMParser === 'undefined') {
  (globalThis as any).DOMParser = DOMParser;
}

// Create XMLSerializer from linkedom document
if (typeof globalThis.XMLSerializer === 'undefined') {
  class XMLSerializerPolyfill {
    serializeToString(node: any): string {
      if (node.outerHTML !== undefined) {
        return node.outerHTML;
      }
      if (node.documentElement) {
        return node.documentElement.outerHTML;
      }
      return '';
    }
  }
  (globalThis as any).XMLSerializer = XMLSerializerPolyfill;
}

// Re-export for direct imports if needed
export { DOMParser };
