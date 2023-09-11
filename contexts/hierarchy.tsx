"use client";
import { TreeNode } from "@/data-structures/tree";
import { ElementContainer } from "@/infra-elements/types";
import { defaultElementContainer } from "@/mocks/containers";
import { createContext, useContext, useState } from "react";

export interface HierarchyContextState {
  root: TreeNode;
  addContainer: (toId: string, container: ElementContainer) => void;
  removeContainer: (id: string) => void;
  selectedNode: TreeNode | null;
  setSelectedNode: (node: TreeNode | null) => void;
}

const contextDefaultValues: HierarchyContextState = {
  root: new TreeNode(defaultElementContainer),
  addContainer: () => {},
  removeContainer: () => {},
  selectedNode: null,
  setSelectedNode: () => {},
};

export const HierarchyContext =
  createContext<HierarchyContextState>(contextDefaultValues);

export function HierarchyProvider({ children }: { children: React.ReactNode }) {
  const [root, setRoot] = useState<TreeNode>(contextDefaultValues.root);
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);

  const addContainer = (toId: string, container: ElementContainer) => {
    const newNode = new TreeNode(container, toId);
    root.addChild(toId, newNode);
    setRoot(root.deepCopy());
  };

  const removeContainer = (id: string) => {
    root.removeChild(id);
    setRoot(root.deepCopy());
  };

  return (
    <HierarchyContext.Provider
      value={{
        root,
        addContainer,
        removeContainer,
        selectedNode,
        setSelectedNode,
      }}
    >
      {children}
    </HierarchyContext.Provider>
  );
}

export function useHierarchy() {
  return useContext(HierarchyContext);
}
