import { ElementContainer } from "@/infra-elements/types";

export const defaultElementContainer: ElementContainer = {
  name: "default-vpc",
  element: {
    type: "VPC",
    properties: {
      name: "default-vpc",
      cidr_block: "192.168.0.0/16",
    },
  },
  children: [],
  parentId: null
};
