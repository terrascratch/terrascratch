import { Property } from "@/infra-elements/templates/type";
import { DefaultInput } from "./text-input";

export interface InputProps {
  property: Property;
  onChange?: (value: any) => void;
}

const getInputComponent = (inputType: string | undefined) => {
//  switch(inputType) {
//    TODO
//    case "multi-select":
//      return MultiSelectInput
//    case "select":
//      return SimpleSelect
//    default:
    return DefaultInput
}

export function Input({ property, onChange }: InputProps) {
  let label = property.name;
  if (property.isRequired) {
    label += " *";
  }

  const InputComponent = getInputComponent(property.input?.type)

  return (
    <div className="flex flex-col items-start justify-center mt-3">
      <p>{label}</p>

      <InputComponent property={property} onChange={onChange} />
    </div>
  );
}
