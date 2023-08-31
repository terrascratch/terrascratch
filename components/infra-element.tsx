"use client";
import { useState } from "react";
import type { ElementContainer } from "@/infra-elements/types";

interface InfraElementProps {
  container: ElementContainer;
  content?: ElementContainer[];
}

function mapContent(children: ElementContainer[]) {
  return children.map((child) => {
    return <RenderContainer key={String(Math.random())} container={child} />;
  });
}

export function RenderContainer({
  container,
  content = [],
}: InfraElementProps) {
  const mappedElements = mapContent(content);
  const [elements, setElements] = useState(mappedElements);

  const handleAddElement = () => {
    const newElement = (
      <RenderContainer key={String(Math.random())} container={container} />
    );
    setElements((oldElements) => [...oldElements, newElement]);
  };

  return (
    <div>
      <h1>{container.name}</h1>

      {elements}

      <button onClick={handleAddElement}>Adicionar</button>
    </div>
  );
}
