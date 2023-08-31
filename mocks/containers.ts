import { ElementContainer } from "@/infra-elements/types";

export const initialContainer: ElementContainer = {
  name: "Teste",
  element: {
    name: "teste1",
    sourcePort: 2,
    destinationPort: 2,
    protocol: "string",
    cidrBlocks: ["string"],
  },
  children: [],
};