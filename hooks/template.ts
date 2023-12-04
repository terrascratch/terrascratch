import templates from "@/infra-elements/templates/aws.json";
import examples from "@/infra-elements/templates/examples/aws.json";
import help from "@/infra-elements/templates/help.json";
import { ElementTemplate } from "@/infra-elements/templates/type";

export function useTemplate(elementType: string) {
  const template: ElementTemplate | undefined = templates.find(
    (template) => template.type === elementType
  );

  if (!template) {
    throw new Error(`No template found for ${elementType}`);
  }

  const isAllRequiredFieldsFilled = (properties: Record<string, any>) => {
    return template.properties.every((property) => {
      if (property.isRequired) {
        return properties[property.name] !== undefined;
      }

      return true;
    });
  };

  return {
    ...template,
    isAllRequiredFieldsFilled,
  };
}

export function useExample(elementType: string) {
  const example = examples.find((example) => example.type === elementType);
  return example?.templates ?? [];
}

export function useHelp(elementTypes: string[]) {
  return elementTypes.map(type => {
    return {
      type: type,
      help: (help as Record<string, string>)[type]
    }
  })
}
