"use client";
import { useState } from "react";
import type { InfraElement } from "@/infra-elements/types";

interface InfraElementProps {
  element: InfraElement;
  children?: InfraElement[];
}

function mapChildren(children: InfraElement[]) {
  return children.map((child) => {
    return <ShowInfraElement key={String(Math.random())} element={child} />;
  });
}

export function ShowInfraElement({
  element,
  children = [],
}: InfraElementProps) {
  const mappedChildren = mapChildren(children);
  const [elements, setElements] = useState(mappedChildren);

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
