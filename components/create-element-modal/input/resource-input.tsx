import { ChangeEvent, useEffect, useState } from "react";
import { InputProps } from ".";
import { SelectInput } from "./select-input";

interface Option {
  label: string
  value: string
}

export function ResourceInput({ property, onChange, root }: InputProps) {
  const [availableResources, setAvailableResources] = useState<Option[]>([])

  useEffect(() => {
    const resourcesName = property.input?.options
    if (resourcesName === undefined) {
      throw new Error()
    }
    const resources = root?.findChildren(resourcesName[0].value)
    setAvailableResources(resources?.map(node => {
      return { label: node.element.properties.label?.toString() ?? node.element.properties.name, value: node.element.properties.name.toString() }
    }) ?? [])
  }, [])


  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event)
  }

  return (
    <SelectInput onChange={handleOnChange} options={availableResources} />
  )
}
