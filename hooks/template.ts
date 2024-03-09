import templates from "@/infra-elements/templates/aws.json";
import examples from "@/infra-elements/templates/examples/aws.json";
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

  const childrenElementTemplates: (ElementTemplate | undefined)[] = template.childrenElementTypes.map(childType => templates.find(template => template.type === childType))

  return {
    ...template,
    childrenElementTemplates,
    isAllRequiredFieldsFilled,
  };
}

export function useExample(elementType: string) {
  const example = examples.find((example) => example.type === elementType);
  return example?.templates ?? [];
}
