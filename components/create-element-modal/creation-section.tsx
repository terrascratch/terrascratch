import { useState } from "react";

interface AvailableElementsProps {
  onSelect: (elementType: string) => void;
}

function AvailableElements(props: AvailableElementsProps) {
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
  onFinish: () => void;
}

export function CreationSection({ onFinish }: CreationSectionProps) {
  const [selectedElementType, setSelectedElementType] = useState<string | null>(
    null
  );

  if (selectedElementType === null)
    return <AvailableElements onSelect={setSelectedElementType} />;

  return (
    <ElementCreationSetup
      elementType={selectedElementType}
      onFinish={onFinish}
    />
  );
}
