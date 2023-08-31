"use client";
import { useState } from "react";
import type { ElementContainer } from "@/infra-elements/types";
import uuid from "react-uuid";
import { TreeNode } from "@/data-structures/tree";
import { useHierarchy } from "@/contexts/hierarchy";

interface RenderTreeNodeProps {
  node: TreeNode;
  onAdd: (newContainer: ElementContainer) => void;
  onDelete?: () => void;
}

export function RenderTreeNode({ node, onAdd }: RenderTreeNodeProps) {
  const hierarchy = useHierarchy();
  const [hovered, setHovered] = useState(false);

  const mappedElements = node.children.map((child) => {
    return (
      <RenderTreeNode
        key={child.id}
        node={child}
        onAdd={(newContainer) => hierarchy.addContainer(node.id, newContainer)}
      />
    );
  });

  return (
    <div
      className="my-5 p-3 px-10 border-solid border-2 border-black bg-zinc-950 rounded-md flex flex-col justify-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <h1 className="font-bold text-lg">{node.name}</h1>

      <div>{mappedElements}</div>

      <button
        className={`${
          hovered ? "block" : "hidden"
        } rounded-md bg-zinc-900 p-3 max-w-xs mt-3`}
        type="button"
        onClick={() =>
          onAdd({
            name: uuid(),
            element: {
              name: "Test1",
              sourcePort: 2,
              destinationPort: 2,
              protocol: "string",
              cidrBlocks: ["string"],
            },
            children: [],
          })
        }
      >
        Add
      </button>
    </div>
  );
}
