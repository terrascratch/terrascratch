export interface SecurityGroupRule {
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
