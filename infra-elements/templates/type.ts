interface Property {
  name: string;
  validTypes: string[];
  isRequired: boolean;
}

interface ChildrenList {
  name: string;
  validElementTypes: string[];
}

export interface ElementTemplate {
  type: string;
  properties: Property[];
  childrenLists: ChildrenList[];
}