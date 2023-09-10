export interface Property {
  name: string;
  validTypes: string[];
  isRequired: boolean;
}

export interface ElementTemplate {
  type: string;
  properties: Property[];
  childrenElementTypes: string[];
}