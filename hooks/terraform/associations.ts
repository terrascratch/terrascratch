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

function getIGWCode(node: TreeNode, root: TreeNode) {
  const igw = node.element
  if (node.parentId === null) {
    throw Error()
  }

  const vpc = root.findNode(node.parentId)?.element
  return `resource "aws_internet_gateway" "${igw.properties.name}" {
  vpc_id = aws_vpc.${vpc?.properties.name}.id
}`
}

function getRouteTableCode(node: TreeNode, root: TreeNode) {
  const routeTable = node.element
  const vpc = root.findNode(root.id)?.element
  const routeBlocks = node.findChildren("Route Table Rule")
  if (node.parentId === null) {
    throw new Error()
  }

  const subnet = root.findNode(node.parentId)?.element.properties.name.toString()
  if (subnet === undefined) {
    throw new Error()
  }

  return `resource "aws_route_table" "${routeTable.properties.name}" {
  vpc_id = aws_vpc.${vpc?.properties.name}.id
  ${routeBlocks.map(n => getRouteTableRuleCode(n, root))}
}\n
${getRouteTableAssociationCode(subnet, routeTable.properties.name.toString())}`
}

function getRouteTableRuleCode(node: TreeNode, root: TreeNode) {
  const routeTableRule = node.element
  if (node.parentId === null) {
    throw new Error()
  }

  return `\n  route {
    cidr_block = ${routeTableRule.properties.cidrBlock}
    gateway_id = aws_internet_gateway.${routeTableRule.properties.gateway}.id
  }`
}

function getRouteTableAssociationCode(subnet: string, routeTable: string) {
  return `resource "aws_route_table_association" "sub-${subnet}-rt-${routeTable}" {
    subnet_id      = aws_subnet.${subnet}.id
    route_table_id = aws_route_table.${routeTable}.id
}`
}

function getVPCCode(node: TreeNode) {
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
  subnet_id     = aws_subnet.${subnet?.properties.name}.id
}`
}

function getSecurityGroupCode(node: TreeNode, root: TreeNode) {
  const securityGroup = node.element
  if (node.parentId === null) {
    throw Error()
  }

  const vpc = root.findNode(node.parentId)?.element

  return `resource "aws_security_group" "${securityGroup.properties.name}" {
  name        = "${securityGroup.properties.name}"
  description = "description"
  vpc_id      = aws_vpc.${vpc?.properties.name}.id

  ${getSecurityGroupRulesCode(node)}
}`
}

function getSecurityGroupRulesCode(node: TreeNode) {
  const securityGroupRules = node.findChildren("Security Group Rule")
  const securityGroupRulesString = securityGroupRules?.map(rule => {
    const { fromPort, toPort, protocol, cidrBlocks } = rule.element.properties

    return `${rule.element.properties.type} {
      from_port   = ${fromPort}
      to_port     = ${toPort}
      protocol    = "${protocol}"
      cidr_blocks = ${cidrBlocks}
  }\n\n\
  `
  }) ?? ''

  return securityGroupRulesString.join('').replace(/(\n[^\n]*){2}$/, '')
}

export function getTerraformCode(fromElement: TreeNode, root: TreeNode) {
  switch (fromElement.element.type) {
    case "Subnet":
      return getSubnetCode(fromElement, root)
    case "VPC":
      return getVPCCode(fromElement)
    case "EC2":
      return getEC2Code(fromElement, root)
    case "Security Group":
      return getSecurityGroupCode(fromElement, root)
    case "Internet Gateway":
      return getIGWCode(fromElement, root)
    case "Route Table":
      return getRouteTableCode(fromElement, root)
    default:
      return ""
  }
}
