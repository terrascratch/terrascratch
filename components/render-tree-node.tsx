"use client";
import { TreeNode } from "@/data-structures/tree";
import { useHierarchy } from "@/contexts/hierarchy";
import { getRandomContainer } from "@/mocks/containers";

interface RenderTreeNodeProps {
  node: TreeNode;
}

export function RenderTreeNode({ node }: RenderTreeNodeProps) {
  const hierarchy = useHierarchy();

  const onAdd = () => {
    hierarchy.addContainer(node.id, getRandomContainer());
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
