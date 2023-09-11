interface InputOption {
  label: string;
  value: string;
}

interface InputTemplate {
  type: string;
  options?: InputOption[];
}

export interface Property {
  name: string;
  validTypes: string[];
  isRequired: boolean;
  input?: InputTemplate;
  placeholder?: string;
}

export interface ElementTemplate {
  type: string;
  properties: Property[];
  childrenElementTypes: string[];
}
