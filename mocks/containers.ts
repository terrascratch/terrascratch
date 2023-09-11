import { ElementContainer } from "@/infra-elements/types";


export const defaultElementContainer: ElementContainer = {
  name: "Main VPC",
  element: {
    type: "VPC",
    properties: {
      name: "Main VPC",
      cidrBlock: "192.168.0.0/16",
    },
  },
  children: [],
};
