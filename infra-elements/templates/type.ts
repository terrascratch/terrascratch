interface InputOption {
  label: string;
  value: string;
}

interface InputTemplate {
  type: string;
  options?: InputOption[];
  validator?: string;
}

export interface Property {
  name: string;
  validTypes: string[];
  isRequired: boolean;
  label?: string;
  input?: InputTemplate;
  placeholder?: string;
}

export interface ElementTemplate {
  type: string;
  properties: Property[];
  childrenElementTypes: string[];
}
