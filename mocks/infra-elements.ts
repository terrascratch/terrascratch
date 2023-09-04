import { InfraElement } from "@/infra-elements/types";

export const securityGroupRule: InfraElement = {
  name: "SecurityGroupRule",
  type: "SecurityGroupRule",
  properties: {
    name: "string",
    sourcePort: 2,
    destinationPort: 2,
    protocol: "string",
    cidrBlocks: ["string"],
  },
};

export const securityGroup: InfraElement = {
  name: "SecurityGroup",
  type: "SecurityGroup",
  properties: {
    name: "string",
  },
};

export const vpc: InfraElement = {
  name: "VPC",
  type: "VPC",
  properties: {
    name: "string",
    cidrBlock: "string",
  },
};

export const subnet: InfraElement = {
  name: "Subnet",
  type: "Subnet",
  properties: {
    name: "string",
    cidrBlock: "string",
    public: false,
  },
};

export const ec2: InfraElement = {
  name: "EC2",
  type: "EC2",
  properties: {
    name: "string",
    ami: "string",
    type: "string",
    publicKey: "string",
  },
};
