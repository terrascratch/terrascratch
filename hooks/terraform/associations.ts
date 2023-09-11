import { TreeNode } from "@/data-structures/tree";

function getSubnetCode(node: TreeNode, root: TreeNode) {
  const subnet = node.element
  if (node.parentId === null) {
    throw Error()
  }
  const vpc = root.findNode(node.parentId)?.element

  return `resource "aws_subnet" "${subnet.properties.name}" {
  vpc_id                  = aws_vpc.${vpc?.properties.name}.id
  cidr_block              = "${subnet.properties.cidrBlock}"
  map_public_ip_on_launch = ${subnet.properties.public}
}`
}

function getVPCCode(node: TreeNode, root: TreeNode) {
  const vpc = node.element
  return `resource "aws_vpc" "${vpc.properties.name}" {
  cidr_block = "${vpc.properties.cidrBlock}"
}`
}

function getEC2Code(node: TreeNode, root: TreeNode) {
  const ec2 = node.element
  if (node.parentId === null) {
    throw Error()
  }
  const subnet = root.findNode(node.parentId)?.element

  return `resource "aws_instance" "${ec2.properties.name}" {
  ami           = "${ec2.properties.imageId}"
  instance_type = "${ec2.properties.instanceType}"
  subnet_id     =   aws_subnet.${subnet?.properties.name}.id
}`
}

function getSecurityGroupCode(node: TreeNode, root: TreeNode) {
  const securityGroup = node.element
  //const vpc = node.findParentByType(VPC_NAME)?.element
  if (node.parentId === null) {
    throw Error()
  }
  const vpc = root.findNode(node.parentId)?.element
  const securityGroupRules = node.findChildren("SecurityGroupRule")

  return `resource "aws_security_group" "${securityGroup.properties.name}" {
  name        = "${securityGroup.properties.name}"
  description = "description"
  vpc_id      = aws_vpc.${vpc?.properties.name}.id
  ${securityGroupRules?.map(rule => {
    const { fromPort, toPort, protocol, cidrBlocks } = rule.element.properties

    return `${rule.element.properties.type} {
      from_port   = ${fromPort}
      to_port     = ${toPort}
      protocol    = ${protocol}
      cidr_blocks = ${cidrBlocks}
    }`
  }) ?? ''}
}`
}

export function getTerraformCode(fromElement: TreeNode, root: TreeNode) {
  switch (fromElement.element.type) {
    case "Subnet":
      return getSubnetCode(fromElement, root)
    case "VPC":
      return getVPCCode(fromElement, root)
    case "EC2":
      return getEC2Code(fromElement, root)
    case "SecurityGroup":
      return getSecurityGroupCode(fromElement, root)
    default:
      return ""
  }
}
