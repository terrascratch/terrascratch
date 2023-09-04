import { ElementContainer, InfraElement } from "@/infra-elements/types";
import { ec2, securityGroup, securityGroupRule, subnet, vpc } from "./infra-elements";

function makeContainer(element: InfraElement) {
  return {
    name: element.name,
    element,
    children: [],
  };
}

export const containers: ElementContainer[] = [
  makeContainer(securityGroupRule),
  makeContainer(securityGroup),
  makeContainer(vpc),
  makeContainer(subnet),
  makeContainer(ec2)
];

export function getRandomContainer() {
  const index = Math.floor(Math.random() * containers.length);
  return containers[index];
}
