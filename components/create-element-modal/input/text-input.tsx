import { InputProps } from ".";

export function DefaultInput({ property, onChange }: InputProps) {
  const defaultPlaceholder = property.validTypes.join(" | ");

  return (
    <input
        className="bg-gray-800 text-white border border-gray-600 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-500 mt-2"
        type={property.input?.type ?? 'text'}
        placeholder={property.placeholder ?? defaultPlaceholder}
        onChange={(e) => onChange && onChange(e.currentTarget.checked)}
    />
  )
}
