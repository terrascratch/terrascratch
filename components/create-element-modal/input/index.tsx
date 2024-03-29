import { TreeNode } from "@/data-structures/tree";
import { Property } from "@/infra-elements/templates/type";
import { ResourceInput } from "./resource-input";
import { DefaultInput } from "./text-input";
import { SelectInput } from "./select-input";

interface Option {
  label: string
  value: string
}
export interface InputProps {
  property: Property;
  onChange: (value: any) => void;
  root?: TreeNode;
  options?: Option[]
}

const getInputComponent = (inputType: string | undefined) => {
  switch (inputType) {
    case "resource":
      return ResourceInput;
    case "multi-resource":
      return ResourceInput;
    case "select":
      return SelectInput
    default:
      return DefaultInput;
  }
  //  switch(inputType) {
  //    TODO
  //    case "multi-select":
  //      return MultiSelectInput
  //    case "select":
  //      return SimpleSelect
  //    default:
};

export function Input({ property, onChange, root }: InputProps) {
  let label = property.name;
  if (property.isRequired) {
    label += " *";
  }

  const InputComponent = getInputComponent(property.input?.type);

  return (
    <div className="flex flex-col items-start justify-center mt-3">
      <p className="text-slate">{label}</p>
      <p className="text-xs text-slate-500 mt-1">{property.description}</p>

      <InputComponent property={property} options={property.input?.options} onChange={onChange} root={root} />
    </div>
  );
}
