/**
 * Global type declarations for DOM polyfills
 */

declare global {
  var DOMParser: {
    new (): {
      parseFromString(source: string, mimeType: string): any;
    };
  };

  var XMLSerializer: {
    new (): {
      serializeToString(node: any): string;
    };
  };

  interface Node {
    parentNode: Node | null;
    childNodes: NodeListOf<Node>;
    textContent: string | null;
    appendChild(node: Node): Node;
    removeChild(child: Node): Node;
    replaceChild(newChild: Node, oldChild: Node): Node;
  }

  interface Element extends Node {
    tagName: string;
    getAttribute(name: string): string | null;
    setAttribute(name: string, value: string): void;
    querySelectorAll(selectors: string): NodeListOf<Element>;
    querySelector(selectors: string): Element | null;
    parentElement: Element | null;
    outerHTML: string;
  }
}

export {};
