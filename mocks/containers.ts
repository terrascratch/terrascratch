import { ElementContainer } from "@/infra-elements/types";


export const defaultElementContainer: ElementContainer = {
  name: "Main VPC",
  element: {
    type: "VPC",
    properties: {
      name: "Main VPC",
      cidrBlock: "192.168.1.0/24",
    },
  },
  children: [],
};
