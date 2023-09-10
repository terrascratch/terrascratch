type PropertyValue = string | number | boolean | string[] | number[] | boolean[];

export interface InfraElement {
  name: string;
  type: string;
  properties: { [key: string]: PropertyValue };
};

export interface ElementContainer {
  name: string;
  element: InfraElement;
  children: ElementContainer[];
}
