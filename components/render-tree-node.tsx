"use client";
import { useState } from "react";
import type { ElementContainer } from "@/infra-elements/types";
import uuid from "react-uuid";
import { TreeNode } from "@/data-structures/tree";
import { useHierarchy } from "@/contexts/hierarchy";

interface RenderTreeNodeProps {
  node: TreeNode;
}

export function RenderTreeNode({ node }: RenderTreeNodeProps) {
  const hierarchy = useHierarchy();

  const onAdd = () => {
    hierarchy.addContainer(node.id, {
      name: uuid(),
      element: {
        name: "Test1",
        sourcePort: 2,
        destinationPort: 2,
        protocol: "string",
        cidrBlocks: ["string"],
      },
      children: [],
    });
  };

  const onDelete = () => {
    hierarchy.removeContainer(node.id);
  };

  const mappedElements = node.children.map((child) => {
    return <RenderTreeNode key={child.id} node={child} />;
  });

  return (
    <div className="my-5 p-3 px-10 border-solid border-2 border-black bg-zinc-950 rounded-md flex flex-col justify-center">
      <h1 className="font-bold text-lg">{node.name}</h1>

      <div>{mappedElements}</div>

      <div className="flex items-center">
        <button
          className="rounded-md bg-zinc-900 p-3 max-w-xs mt-3 mr-3"
          type="button"
          onClick={onAdd}
        >
          Add
        </button>

        <button
          className="rounded-md bg-zinc-900 p-3 max-w-xs mt-3"
          type="button"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
