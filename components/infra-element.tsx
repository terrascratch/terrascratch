import { useState } from "react";

interface InfraElementProps {
  title: string;
}

export function InfraElement({ title }: InfraElementProps) {
  const [children, setChildren] = useState([]);

  return (
    <div>
      <h1>{title}</h1>

      {children}

      <button>Adicionar</button>
    </div>
  );
}
