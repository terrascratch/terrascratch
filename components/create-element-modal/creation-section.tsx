import { useHierarchy } from "@/contexts/hierarchy";
import { useTemplate } from "@/hooks/template";
import { InfraElement } from "@/infra-elements/types";
import { useState } from "react";
import { Input } from "./input";

interface AvailableElementsProps {
  parentElement: InfraElement;
  onSelect: (elementType: string) => void;
}

function AvailableElements(props: AvailableElementsProps) {
  const template = useTemplate(props.parentElement.type);

  const childTypeButtons = template.childrenElementTypes.map((type) => {
    return (
      <li key={type}>
        <button onClick={() => props.onSelect(type)}>{type}</button>
      </li>
    );
  });

  return (
    <section>
      <h3>Select one available child element type</h3>

      <ul>{childTypeButtons}</ul>
    </section>
  );
}

interface ElementCreationSetupProps {
  elementType: string;
}

function ElementCreationSetup({ elementType }: ElementCreationSetupProps) {
  const template = useTemplate(elementType);

  const inputs = template.properties.map((property) => {
    return (
      <li key={property.name}>
        <Input
          label={property.name}
          placeholder={`Preencha o valor para ${property.name}`}
        />
      </li>
    );
  });

  return (
    <section className="w-full">
      <h3>Fill the properties of the new {elementType}</h3>

      <ul>{inputs}</ul>

      <div className="flex w-full items-center justify-end">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 mt-3 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:w-auto"
        >
          Create
        </button>
      </div>
    </section>
  );
}

interface CreationSectionProps {
  parentElement: InfraElement;
}

export function CreationSection({ parentElement }: CreationSectionProps) {
  const [selectedElementType, setSelectedElementType] = useState<string | null>(
    null
  );

  if (selectedElementType === null)
    return (
      <AvailableElements
        parentElement={parentElement}
        onSelect={setSelectedElementType}
      />
    );

  return <ElementCreationSetup elementType={selectedElementType} />;
}
