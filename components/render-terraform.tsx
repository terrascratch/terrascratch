import { useHierarchy } from "@/contexts/hierarchy";
import { useTerraform } from "@/hooks/terraform";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

export function RenderTerraform() {
  const hierarchy = useHierarchy();
  const code = useTerraform(hierarchy.root);

  return (
    <SyntaxHighlighter language="javascript" style={dracula}>
      {code}
    </SyntaxHighlighter>
  );
}
