"use client";
import { useHierarchy } from "@/contexts/hierarchy";
import { TreeNode } from "@/data-structures/tree";
import { useTemplate } from "@/hooks/template";

function ShowNodeDetails({ node }: { node: TreeNode }) {
  const properties = Object.entries(node.element.properties).filter(
    ([key]) => key !== "name"
  );
  const propertiesInfos = properties.map(([key, value]) => {
    return (
      <div key={key}>
        <span className="font-bold">{key}</span>: {String(value)}
      </div>
    );
  });

  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-start justify-center">
        <h1 className="font-bold mr-3 text-xl">{node.name}</h1>
        <span className="text-gray-500">| {node.element.type}</span>
      </div>

      <div className="flex flex-col mt-3">{propertiesInfos}</div>
    </div>
  );
}

interface RenderTreeNodeProps {
  node: TreeNode;
  isRoot?: boolean;
}

export function RenderTreeNode({ node, isRoot }: RenderTreeNodeProps) {
  const template = useTemplate(node.element.type);
  const hierarchy = useHierarchy();

  const onAdd = () => {
    hierarchy.setSelectedNode(node);
  };

  const onDelete = () => {
    hierarchy.removeContainer(node.id);
  };

  const mappedElements = node.children.map((child) => {
    return <RenderTreeNode key={child.id} node={child} />;
  });

  return (
    <div className="w-full my-5 p-3 px-10 border-solid border-2 border-black bg-gray-900 rounded-md flex flex-col justify-center">
      <ShowNodeDetails node={node} />

      <div>{mappedElements}</div>

      <div className="flex items-center">
        {template.childrenElementTypes.length > 0 && (
          <button
            className="rounded-md bg-green-800 p-2 max-w-xs mt-3 mr-3"
            type="button"
            onClick={onAdd}
          >
            <b>+ new resource</b>
          </button>
        )}

        {!isRoot && (
          <button
            className="rounded-md bg-red-800 p-2 max-w-xs mt-3"
            type="button"
            onClick={onDelete}
          >
            <b>delete</b>
          </button>
        )}
      </div>
    </div>
  );
}
