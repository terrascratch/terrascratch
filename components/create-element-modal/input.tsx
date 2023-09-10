import { Property } from "@/infra-elements/templates/type";

interface InputProps {
  property: Property;
  onChange?: (value: string) => void;
}

export function Input({ property, onChange }: InputProps) {
  let label = property.name;
  if (property.isRequired) {
    label += " *";
  }

  const placeholder = property.validTypes.join(" | ");

  return (
    <div className="flex flex-col items-start justify-center mt-3">
      <p>{label}</p>

      <input
        className="bg-gray-800 text-white border border-gray-600 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-500 mt-2"
        type="text"
        placeholder={placeholder}
        onChange={(e) => onChange && onChange(e.target.value)}
      />
    </div>
  );
}
