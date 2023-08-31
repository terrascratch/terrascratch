import { ElementContainer, InfraElement } from "@/infra-elements/types";
import uuid from "react-uuid";

export class TreeNode implements ElementContainer {
  id: string;
  name: string;
  element: InfraElement;
  children: TreeNode[] = [];

  constructor(container: ElementContainer) {
    this.id = uuid();
    this.name = container.name;
    this.element = container.element;
    this.addChildren(container.children);
  }

  addChildren(containers: ElementContainer[]) {
    for (const container of containers) {
      this.children.push(new TreeNode(container));
    }
  }

  findNode(id: string): TreeNode | null {
    if (this.id === id) {
      return this;
    }
    for (const child of this.children) {
      const found = child.findNode(id);
      if (found) {
        return found;
      }
    }
    return null;
  }

  addChild(toId: string, container: ElementContainer) {
    const node = new TreeNode(container);
    const parent = this.findNode(toId);

    if (parent === null) {
      throw new Error(`Could not find node with id ${toId}`);
    }

    parent.children.push(node);
  }

  removeChild(idToRemove: string) {
    for (let i = 0; i < this.children.length; i++) {
      if (this.children[i].id === idToRemove) {
        this.children.splice(i, 1);
        return;
      }
    }

    for (const child of this.children) {
      child.removeChild(idToRemove);
    }
  }

  deepCopy(): TreeNode {
    return new TreeNode(this);
  }
}