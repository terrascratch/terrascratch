import { useState } from "react";
import { Tree } from '@/data-structures/tree'

interface ElementProperty {
  label: string;
  value: string;
}

interface InfraElement {
  title: string;
  properties: ElementProperty[];
}

export function useHierarchy() {
  const newTree = new Tree<InfraElement>();
  newTree.replaceRoot({
    title: 'root',
    properties: []
  });

  const [tree, setTree] = useState<Tree<InfraElement>>(newTree);

  const updateTree = (oldTree: Tree<InfraElement>) => {
    setTree(oldTree.deepCopy());
  }

  const addNodeTo = (data: InfraElement, id: number) => {
    tree.addNodeTo(data, id);
    updateTree(tree);
  }

  const removeNodeTo = (id: number) => {
    tree.removeNode(id);
    updateTree(tree);
  }

  return {
    addNodeTo,
    removeNodeTo,
  }
}