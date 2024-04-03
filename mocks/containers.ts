import { ElementContainer } from "@/infra-elements/types";

export const defaultElementContainer: ElementContainer = {
  name: "main",
  element: {
    type: "aws_vpc",
    properties: {
      name: "main",
      cidr_block: "192.168.0.0/16",
    },
  },
  children: [],
  parentId: null
};
