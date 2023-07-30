class TreeNode<T> {
  id: number;
  data: T;
  parentId: number | null;
  children: TreeNode<T>[];

  constructor(id: number, parentId: number | null, data: T) {
    this.id = id;
    this.parentId = parentId;
    this.children = [];
    this.data = data;
  }
}

export class Tree<T> {
  nextId: number;
  root: TreeNode<T>;

  constructor(data: T) {
    this.nextId = 0;
    this.root = new TreeNode(this.nextId, null, data);
  }

  isEmpty(): boolean {
    return this.root === null;
  }

  findNode(id: number): TreeNode<T> | undefined {
    const queue = [this.root];

    while (queue.length) {
      const node = queue.shift();

      if (node?.id === id) {
        return node;
      }

      if (!node) {
        continue;
      }

      for (const child of node.children) {
        queue.push(child);
      }
    }
  }

  addNodeTo(data: T, id: number): void {
    const parent = this.findNode(id);

    if (!parent) {
      throw new Error('Cannot add node to non-existent parent.');
    }

    const newNode = new TreeNode(this.nextId, id, data);
    this.nextId += 1;

    parent.children.push(newNode);
  }

  removeNode(id: number): void {
    const nodeToRemove = this.findNode(id);
    if (!nodeToRemove || !nodeToRemove.parentId) {
      throw new Error('Cannot remove non-existent node.');
    }

    const parent = this.findNode(nodeToRemove.parentId);
    if (!parent) {
      throw new Error('Cannot remove root node.');
    }

    parent.children = parent.children.filter(child => child.id !== nodeToRemove.id);
  }

  deepCopy(): TreeNode<T> {
    const queue = [this.root];
    const newRoot = new TreeNode(this.nextId, null, this.root.data);
    const newTree = new Tree(this.root.data);

    while (queue.length) {
      const node = queue.shift();

      if (!node) {
        continue;
      }

      for (const child of node.children) {
        queue.push(child);
        newTree.addNodeTo(child.data, node.id);
      }
    }

    return newRoot;
  }
}