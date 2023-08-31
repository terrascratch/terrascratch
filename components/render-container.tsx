"use client";
import { useState } from "react";
import type { ElementContainer } from "@/infra-elements/types";
import uuid from "react-uuid";

interface InfraElementProps {
  container: ElementContainer;
  content?: ElementContainer[];
}

function mapContent(children: ElementContainer[]) {
  return children.map((child) => {
    return <RenderContainer key={uuid()} container={child} />;
  });
}

export function RenderContainer({
  container,
  content = [],
}: InfraElementProps) {
  const mappedElements = mapContent(content);
  const [elements, setElements] = useState(mappedElements);

  const handleAddElement = () => {
    const newElement = <RenderContainer key={uuid()} container={container} />;
    setElements((oldElements) => [...oldElements, newElement]);
  };

  return (
    <div className="my-5 p-3 px-10 border-solid border-2 border-black bg-zinc-950 rounded-md flex flex-col justify-center">
      <h1 className="font-bold text-lg">{container.name}</h1>

      <div>{elements}</div>

      <button
        className="rounded-md bg-zinc-900 p-3 max-w-xs mt-3"
        type="button"
        onClick={handleAddElement}
      >
        Add
      </button>
    </div>
  );
}
