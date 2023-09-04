export interface SecurityGroupRule {
  name: string;
  sourcePort: number;
  destinationPort: number;
  protocol: string;
  cidrBlocks: string[];
}

export interface SecurityGroup {
  name: string;
  instances: EC2[];
  ingressRules: SecurityGroupRule[];
  egressRules: SecurityGroupRule[];
}

export interface VPC {
  name: string;
  securityGroups: SecurityGroup[];
  instances: EC2[];
  cidrBlock: string;
}

export interface Subnet {
  name: string;
  vpc: VPC;
  cidrBlock: string;
  public: boolean;
}

export interface EC2 {
  name: string;
  ami: string;
  type: string;
  publicKey: string;
  securityGroups: SecurityGroup[];
  vpc: VPC;
}

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
