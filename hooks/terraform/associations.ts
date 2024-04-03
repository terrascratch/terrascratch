import { TreeNode } from "@/data-structures/tree";
import { PublicRouteTableBlock } from "./types";
import { breakLine } from "@/util";

function getSubnetCode(node: TreeNode, root: TreeNode) {
  const subnet = node.element
  if (node.parentId === null) {
    throw Error()
  }
  const vpc = root.findNode(node.parentId)?.element

  const subnetCode =  `resource "aws_subnet" "${subnet.properties.name}" {
  vpc_id                  = aws_vpc.${vpc?.properties.name}.id
  cidr_block              = "${subnet.properties.cidr_block}"
  map_public_ip_on_launch = ${!!subnet.properties.public}
}
  `

  const igwCode = getIGWCode(node, root)
  const routeTableCode = getRouteTableCode(node, root, [{ igwName: node.name, cidrBlock: "0.0.0.0/0"}])

  return `${subnetCode}${!!subnet.properties.public && '\n' + igwCode + '\n\n' + routeTableCode || ''}`
}

function getIGWCode(node: TreeNode, root: TreeNode) {
  const subnet = node.element
  if (node.parentId === null) {
    throw Error()
  }

  const vpc = root.findNode(node.parentId)?.element
  return `resource "aws_internet_gateway" "${subnet.properties.name}" {
  vpc_id = aws_vpc.${vpc?.properties.name}.id
}`
}

function getRouteTableCode(node: TreeNode, root: TreeNode, routeBlocks: PublicRouteTableBlock[] = []) {
  const subnet = node.element
  const vpc = root.findNode(root.id)?.element
  if (node.parentId === null) {
    throw new Error()
  }

  return `resource "aws_route_table" "${subnet.properties.name}" {
  vpc_id = aws_vpc.${vpc?.properties.name}.id
  ${routeBlocks.map(n => getRouteTableRuleCode(n.cidrBlock, n.igwName))}
}\n
${getRouteTableAssociationCode(subnet.properties.name.toString())}`
}

function getRouteTableRuleCode(cidrBlock: string, gateway: string) {
  return `\n  route {
    cidr_block = "${cidrBlock}"
    gateway_id = aws_internet_gateway.${gateway}.id
  }`
}

function getRouteTableAssociationCode(subnetName: string) {
  return `resource "aws_route_table_association" "sub-${subnetName}-rt-${subnetName}" {
  subnet_id      = aws_subnet.${subnetName}.id
  route_table_id = aws_route_table.${subnetName}.id
}`
}

function getVPCCode(node: TreeNode) {
  const vpc = node.element
  return `resource "aws_vpc" "${vpc.properties.name}" {
  cidr_block = "${vpc.properties.cidr_block}"
}`
}

function getEC2Code(node: TreeNode, root: TreeNode) {
  const ec2 = node.element
  if (node.parentId === null) {
    throw Error()
  }
  const subnet = root.findNode(node.parentId)?.element
  const vpcSecurityGroupIdsCode =  ec2.properties.vpc_security_group_ids ? `vpc_security_group_ids = [aws_security_group.${ec2.properties.vpc_security_group_ids}.id]` : ''
  const keyNameCode = ec2.properties.key_name ? `key_name = aws_key_pair.${ec2.properties.key_name}.key_name` : ''

  return `resource "aws_instance" "${ec2.properties.name}" {
  ami                    = "${ec2.properties.ami}"
  instance_type          = "${ec2.properties.instance_type}"
  subnet_id              = aws_subnet.${subnet?.properties.name}.id
  ${vpcSecurityGroupIdsCode}
  ${keyNameCode}
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
    const { from_port, to_port, protocol, cidr_blocks } = rule.element.properties

    return `${rule.element.properties.type} {
      from_port   = ${from_port}
      to_port     = ${to_port}
      protocol    = "${protocol}"
      cidr_blocks = ["${cidr_blocks}"]
  }\n\n\
  `
  }) ?? ''

  return securityGroupRulesString.join('').replace(/(\n[^\n]*){2}$/, '')
}

function getKeyPairCode(node: TreeNode) {
  const keyPair = node.element
  return `resource "aws_key_pair" "${keyPair.properties.name}" {
  key_name   = "${keyPair.properties.name}"
  public_key = <<EOF
${breakLine(keyPair.properties.public_key.toString())}
EOF
}`
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
    case "Key Pair":
      return getKeyPairCode(fromElement)
    default:
      return ""
  }
}
