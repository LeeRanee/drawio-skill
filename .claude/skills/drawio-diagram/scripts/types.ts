/**
 * Shared type definitions for draw.io tools
 */

export interface MxCell {
  id: string;
  value?: string;
  style?: string;
  vertex?: boolean;
  edge?: boolean;
  parent?: string;
  source?: string;
  target?: string;
  geometry?: MxGeometry;
}

export interface MxGeometry {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  relative?: boolean;
}

export interface DiagramMetadata {
  id: string;
  name: string;
  modified?: string;
  agent?: string;
}

export interface DrawioFile {
  metadata: DiagramMetadata;
  cells: MxCell[];
  raw: any; // DOM Document from linkedom
}

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export interface RepairResult {
  repaired: boolean;
  repairedXML?: string;
  fixedIssues?: string[];
}
