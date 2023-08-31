"use client";
import { useState } from "react";
import type { InfraElement } from "@/infra-elements/types";

interface InfraElementProps {
  element: InfraElement;
  content?: InfraElement[];
}

function mapContent(children: InfraElement[]) {
  return children.map((child) => {
    return <ShowInfraElement key={String(Math.random())} element={child} />;
  });
}

export function ShowInfraElement({ element, content = [] }: InfraElementProps) {
  const mappedElements = mapContent(content);
  const [elements, setElements] = useState(mappedElements);

  const handleAddElement = () => {
    const newElement = (
      <ShowInfraElement key={String(Math.random())} element={element} />
    );
    setElements((oldElements) => [...oldElements, newElement]);
  };

  return (
    <div>
      <h1>{element.name}</h1>

      {elements}

      <button onClick={handleAddElement}>Adicionar</button>
    </div>
  );
}
