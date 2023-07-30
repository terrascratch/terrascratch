import { useState } from "react";
import { Tree } from '@/data-structures/tree'

interface ElementProperty {
  label: string;
  value: string;
}

interface InfraElement {
  title: string;
  properties: ElementProperty[];
}

export function useHierarchy() {
  const [trees, setTrees] = useState<Tree<InfraElement>[]>([]);
}