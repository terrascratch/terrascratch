import { useHierarchy } from "@/contexts/hierarchy";
import { useTerraform } from "@/hooks/terraform";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaRegCopy } from "react-icons/fa";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { toast } from "react-toastify";

export function RenderTerraform() {
  const hierarchy = useHierarchy();
  const code = useTerraform(hierarchy.root);
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    toast.success('Copied!')
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 3000);
  }

  return (
    <>
      <SyntaxHighlighter language="hcl" style={dracula}>
        {code}
      </SyntaxHighlighter>
      <CopyToClipboard text={code} onCopy={handleCopy}>
        <button
          disabled={copied}
          className="float-right disabled:bg-gray-900 disabled:text-slate-500 transition ease-in-out bg-[#282A36] hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-full shadow"
        >
          <FaRegCopy/>
        </button>
      </CopyToClipboard>
    </>
  );
}
