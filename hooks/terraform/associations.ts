import { InfraElement } from "@/infra-elements/types";

function getSubnetCode(subnet: InfraElement) {
  return `resource "aws_subnet" "${subnet.properties.name}" {
  vpc_id     = aws_vpc.id
  cidr_block = "${subnet.properties.cidrBlock}"
  map_public_ip_on_launch = ${subnet.properties.public}
}`
}

function getVPCCode(vpc: InfraElement) {
  return `resource "aws_vpc" "${vpc.properties.name}" {
  cidr_block = "${vpc.properties.cidrBlock}"
}`
}

function getEC2Code(ec2: InfraElement) {
  return `resource "aws_instance" "${ec2.properties.name}" {
  ami           = "${ec2.properties.imageId}"
  instance_type = "${ec2.properties.instanceType}"
}`
}

function getSecurityGroupCode(securityGroup: InfraElement) {
  return `resource "aws_security_group" "${securityGroup.properties.name}" {
  name        = "${securityGroup.properties.name}"
  description = "description"
  vpc_id      = aws_vpc.id
}`
}

function getSecurityGroupRuleCode(securityGroupRule: InfraElement) {
  return `resource "aws_security_group_rule" "${securityGroupRule.properties.name}" {
  type              = "${securityGroupRule.properties.type}"
  from_port         = ${securityGroupRule.properties.sourcePort}
  to_port           = ${securityGroupRule.properties.destinationPort}
  protocol          = "${securityGroupRule.properties.protocol}"
  cidr_blocks       = ${securityGroupRule.properties.cidrBlocks}
  security_group_id = aws_security_group.id
}`
}

export function getTerraformCode(fromElement: InfraElement) {
  switch (fromElement.type) {
    case "Subnet":
      return getSubnetCode(fromElement)
    case "VPC":
      return getVPCCode(fromElement)
    case "EC2":
      return getEC2Code(fromElement)
    case "SecurityGroup":
      return getSecurityGroupCode(fromElement)
    case "SecurityGroupRule":
      return getSecurityGroupRuleCode(fromElement)
    default:
      return ""
  }
}
