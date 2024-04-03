import { ChangeEvent } from "react";
import { InputProps } from ".";

export function DefaultInput({ property, onChange }: InputProps) {
  const defaultPlaceholder = property.validTypes.join(" | ");
  const bigText = property.input?.type === "big-text";
  const maxLength = bigText ? 1024 : 32

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (property.input?.type === 'checkbox') {
      onChange?.(event.currentTarget.checked)
    } else {
      onChange?.(event.target.value.trim())
    }
  }

  return (
    <div>
      <input
        className="bg-gray-800 text-white border border-gray-600 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-500 mt-2"
        type={property.input?.type ?? 'text'}
        placeholder={property.placeholder ?? defaultPlaceholder}
        onChange={handleOnChange}
        pattern="^[a-zA-Z0-9]+$"
        maxLength={maxLength}
      />
    </div>
  )
}
