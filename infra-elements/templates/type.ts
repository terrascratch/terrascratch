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
  description?: string;
}

export interface Help {
  alias?: string
  documentationLink: string;
  description: string
}

export interface ElementTemplate {
  type: string;
  help?: Help;
  properties: Property[];
  childrenElementTypes: string[];
}
