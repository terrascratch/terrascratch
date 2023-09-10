import { TreeNode } from "@/data-structures/tree";
import { getTerraformCode } from "./associations";



export function useTerraform(root: TreeNode) {
  let initialCodeString =
    'provider "aws" {\n\
  region = "us-east-1"\n\
}';

  const addNodeCode = (node: TreeNode) => {
    initialCodeString += '\n\n' + getTerraformCode(node.element)

    for (const current of node.children) {
      addNodeCode(current)
    }
  }

  addNodeCode(root)

  return initialCodeString
}