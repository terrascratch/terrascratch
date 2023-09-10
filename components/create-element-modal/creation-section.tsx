import { useHierarchy } from "@/contexts/hierarchy";
import { useTemplate } from "@/hooks/template";
import { InfraElement } from "@/infra-elements/types";
import { useState } from "react";

interface AvailableElementsProps {
  parentElement: InfraElement;
  onSelect: (elementType: string) => void;
}

function AvailableElements(props: AvailableElementsProps) {
  const template = useTemplate(props.parentElement.type);

  return (
    <section>
      <h3>Select one available child element type</h3>

      <ul>
        <li>
          <button onClick={() => props.onSelect("VPC")}>VPC</button>
        </li>
      </ul>
    </section>
  );
}

interface ElementCreationSetupProps {
  elementType: string;
  onFinish: () => void;
}

function ElementCreationSetup({}: ElementCreationSetupProps) {
  return <section></section>;
}

interface CreationSectionProps {
  parentElement: InfraElement;
  onFinish: () => void;
}

export function CreationSection({
  onFinish,
  parentElement,
}: CreationSectionProps) {
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

  return (
    <ElementCreationSetup
      elementType={selectedElementType}
      onFinish={onFinish}
    />
  );
}
