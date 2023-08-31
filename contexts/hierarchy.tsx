"use client";
import { TreeNode } from "@/data-structures/tree";
import { ElementContainer } from "@/infra-elements/types";
import { createContext, useState, FC, useContext } from "react";

export interface HierarchyContextState {
  root: TreeNode;
  addContainer: (toId: string, container: ElementContainer) => void;
}

const defaultElementContainer = {
  name: "test1",
  element: {
    name: "Test1",
    sourcePort: 2,
    destinationPort: 2,
    protocol: "string",
    cidrBlocks: ["string"],
  },
  children: [],
};

const contextDefaultValues: HierarchyContextState = {
  root: new TreeNode(defaultElementContainer),
  addContainer: () => {},
};

export const HierarchyContext =
  createContext<HierarchyContextState>(contextDefaultValues);

export function HierarchyProvider({ children }: { children: React.ReactNode }) {
  const [root, setRoot] = useState<TreeNode>(contextDefaultValues.root);

  const addContainer = (toId: string, container: ElementContainer) => {
    const newNode = new TreeNode(container);
    root.addChild(toId, newNode);
    setRoot(root.deepCopy());
  };

  return (
    <HierarchyContext.Provider
      value={{
        root,
        addContainer,
      }}
    >
      {children}
    </HierarchyContext.Provider>
  );
}

export function useHierarchy() {
  return useContext(HierarchyContext);
}
