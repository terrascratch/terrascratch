import templates from '@/infra-elements/templates/default.json';

export function useTemplate(elementType: string) {
  const template = templates.find((template) => template.type === elementType);

  if (!template) {
    throw new Error(`No template found for ${elementType}`);
  }

  const isAllRequiredFieldsFilled = (properties: Record<string, any>) => {
    return template.properties.every(
      (property) => {
        if (property.isRequired) {
          return properties[property.name] !== undefined;
        }

        return true;
      }
    );
  }

  return {
    ...template,
    isAllRequiredFieldsFilled
  };
}