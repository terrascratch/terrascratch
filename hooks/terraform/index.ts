import { TreeNode } from "@/data-structures/tree";
import { getTerraformCode } from "./associations";


export function useTerraform(root: TreeNode) {
  let initialCodeString =
    'provider "aws" {\n\
  region     = "us-east-1"\n\
  access_key = "my-access-key"\n\
  secret_key = "my-secret-key"\n\
}';

  const addNodeCode = (node: TreeNode) => {
    initialCodeString += '\n\n' + getTerraformCode(node, root).trim()

    for (const current of node.children) {
      addNodeCode(current)
    }
  }

  addNodeCode(root)

  return initialCodeString.replace(/\n{3,}/g, '\n\n')
}
