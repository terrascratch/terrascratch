import { useHierarchy } from "@/contexts/hierarchy";
import { useExample, useTemplate } from "@/hooks/template";
import { InfraElement, PropertyValue } from "@/infra-elements/types";
import { useEffect, useState } from "react";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";
import { Input } from "./input";

interface AvailableElementsProps {
  parentElement: InfraElement;
  onSelect: (elementType: string) => void;
}

interface HelpButtonProps {
  documentationLink?: string
  description?: string
}

function HelpDescription({ description }: HelpButtonProps) {
  return (
    <div className="absolute bg-gray-600 p-3 rounded-md text-white text-sm z-10 left-[40px]">
      {description}
    </div>
  )
}

function HelpButton(props: HelpButtonProps) {
  const [hover, setHover] = useState(false)

  const onMouseEnter = () => setHover(true)
  const onMouseLeave = () => setHover(false)

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {hover && <HelpDescription description={props.description}/>}
      <a href={props.documentationLink} target="_blank" rel="noopener noreferrer"><IoMdHelpCircleOutline /></a>
    </div>
  )
}

function AvailableElements(props: AvailableElementsProps) {
  const template = useTemplate(props.parentElement.type);

  const childTypeButtons = template.childrenElementTemplates.map(child => {
    if (child) {
      return (
        <li key={child.type}>
          <div className="flex items-center">
            <button
              className="rounded-md bg-gray-700 p-3 max-w-xs mt-3 mr-3"
              onClick={() => props.onSelect(child.type)}
            >
              {child.type}
            </button>
            {child.help && <HelpButton documentationLink={child.help.documentationLink} description={child.help.description}/>}
          </div>
        </li>
      );
    }
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
  const hierarchy = useHierarchy();
  const template = useTemplate(elementType);

  const [propertyValues, setPropertyValues] = useState<Record<string, string>>(
    {}
  );

  const inputs = template.properties.map((property) => {
    return (
      <li key={property.name}>
        <Input
          property={property}
          onChange={(value) => {
            setPropertyValues({
              ...propertyValues,
              [property.name]: value,
            });
          }}
          root={hierarchy.root}
        />
      </li>
    );
  });

  const examples = useExample(elementType).map((example) => {
    const escapeArray = (value: any, index: number, arr: any[]) => {
      if (index === arr.length - 1) {
        return `"${value}"`;
      }
      return `"${value}", `;
    };

    return (
      <button
        className="transition ease-in-out bg-[#282A36] hover:bg-gray-600 text-white font-semibold text-sm/[14px] rounded-lg shadow pr-2.5 pl-2.5 py-2.5 px-2.5 mr-2 mb-2"
        key={example.label}
        onClick={() => {
          let props = {};
          example.properties.forEach((property) => {
            const realValue = Array.isArray(property.value)
              ? `[${property.value.map(escapeArray)}]`
              : property.value;
            props = { ...props, [property.name]: `${realValue}` };
          });

          addContainer(props);
        }}
      >
        {example.label}
      </button>
    );
  });

  const addContainer = (properties: { [key: string]: PropertyValue }) => {
    if (hierarchy.selectedNode === null) {
      toast.error("You must select a parent element");
      return;
    }

    hierarchy.addContainer(hierarchy.selectedNode.id, {
      name: properties?.name?.toString() ?? elementType,
      element: {
        type: elementType,
        properties: properties,
      },
      children: [],
      parentId: hierarchy.selectedNode.id,
    });
    hierarchy.setSelectedNode(null);
  };

  const allRequiredFieldsFilled = () => {
    return template.properties.filter((property) => property.isRequired && !propertyValues[property.name]).length === 0
  }

  const onCreate = () => {
    if (!allRequiredFieldsFilled()) {
      const requiredFieldsNotFilled = template.properties.filter((property) => property.isRequired && !propertyValues[property.name]).map(property => property.name).join(', ');
      toast.error(`You must fill all required fields: ${requiredFieldsNotFilled}`);
      return;
    }
    addContainer(propertyValues);
  };

  return (
    <section className="w-full flex flex-col">
      <div>{examples}</div>
      <h3>Fill the properties of the new {elementType}</h3>

      <ul>{inputs}</ul>

      <span className="mt-5">* Required fields</span>

      <button
        type="button"
        onClick={onCreate}
        className="inline-flex justify-center rounded-md bg-green-600 px-3 py-2 mt-3 text-sm font-semibold text-white shadow-sm hover:bg-green-500 w-40"
      >
        Create
      </button>
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
